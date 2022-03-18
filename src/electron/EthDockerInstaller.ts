import sudo from 'sudo-prompt';

import { commandJoin } from "command-join"

import { execFile } from 'child_process';
import { promisify } from 'util';
import { withDir } from 'tmp-promise'

import { open, rm, mkdir } from 'fs/promises';

import path from 'path';
import os from 'os';

import {
  ExecutionClient,
  ConsensusClient,
  IMultiClientInstaller,
  KeyImportResult,
  NodeStatus,
  ValidatorStatus,
  InstallDetails
} from "./IMultiClientInstaller";
import { Network } from '../react/types';
import { doesFileExist, doesDirectoryExist } from './BashUtils';

const execFileProm = promisify(execFile);

const dockerServiceName = 'docker.service';
const installPath = path.join(os.homedir(), '.wagyu-installer');
const ethDockerGitRepository = 'https://github.com/eth-educators/eth-docker.git';

type SystemdServiceDetails = {
  description: string | undefined;
  loadState: string | undefined;
  activeState: string | undefined;
  subState: string | undefined;
  unitFileState: string | undefined;
}

export class EthDockerInstaller implements IMultiClientInstaller {

  title = 'Electron';

  async preInstall(): Promise<boolean> {

    let packagesToInstall = new Array<string>();

    // We need git installed
    const gitPackageName = 'git';

    const gitInstalled = await this.checkForInstalledUbuntuPackage(gitPackageName);
    if (!gitInstalled) {
      packagesToInstall.push(gitPackageName);
    }

    // We need docker installed, enabled and running
    const dockerPackageName = 'docker-compose';
    let needToEnableDockerService = true;
    let needToStartDockerService = false;

    const dockerInstalled = await this.checkForInstalledUbuntuPackage(dockerPackageName);
    if (!dockerInstalled) {
      packagesToInstall.push(dockerPackageName);
    } else {
      const dockerServiceDetails = await this.getSystemdServiceDetails(dockerServiceName);
      needToEnableDockerService = dockerServiceDetails.unitFileState != 'enabled';
      needToStartDockerService = dockerServiceDetails.subState != 'running';
    }

    // We need our user to be in docker group
    const dockerGroupName = 'docker';
    const needUserInDockerGroup = !await this.isUserInGroup(dockerGroupName);

    // We need our installPath directory
    await mkdir(installPath, { recursive: true });

    return await this.preInstallAdminScript(
      packagesToInstall,
      needUserInDockerGroup,
      needToEnableDockerService,
      needToStartDockerService);
  }

  async getSystemdServiceDetails(serviceName: string): Promise<SystemdServiceDetails> {
    let resultValue: SystemdServiceDetails = {
      description: undefined,
      loadState: undefined,
      activeState: undefined,
      subState: undefined,
      unitFileState: undefined
    };

    const properties = ['Description', 'LoadState', 'ActiveState', 'SubState', 'UnitFileState'];

    const { stdout, stderr } = await execFileProm('systemctl',
      ['show', serviceName, '--property=' + properties.join(',')]);

    const lines = stdout.split('\n');
    const lineRegex = /(?<key>[^=]+)=(?<value>.*)/;
    for (const line of lines) {
      const found = line.match(lineRegex);
      if (found) {
        const key = found.groups?.key;
        const value = found.groups?.value.trim();

        switch (key) {
          case "Description":
            resultValue.description = value;
            break;
          case "LoadState":
            resultValue.loadState = value;
            break;
          case "ActiveState":
            resultValue.activeState = value;
            break;
          case "SubState":
            resultValue.subState = value;
            break;
          case "UnitFileState":
            resultValue.unitFileState = value;
            break;
        }
      }
    }

    return resultValue;
  }

  async preInstallAdminScript(
    packagesToInstall: Array<string>,
    needUserInDockerGroup: boolean,
    needToEnableDockerService: boolean,
    needToStartDockerService: boolean): Promise<boolean> {

    if (
      packagesToInstall.length > 0 ||
      needUserInDockerGroup ||
      needToEnableDockerService ||
      needToStartDockerService
    ) {
      // We need to perform some admin commands.
      // Create script and execute it with sudo. This will minimize the amount of password prompts.

      let commandResult = false;

      await withDir(async dirResult => {

        const scriptPath = path.join(dirResult.path, 'commands.sh');

        const scriptFile = await open(scriptPath, 'w');
        await scriptFile.write('#!/bin/bash\n');

        // Install APT packages
        if (packagesToInstall.length > 0) {
          await scriptFile.write('apt -y update\n');
          await scriptFile.write('apt -y install ' + commandJoin(packagesToInstall) + '\n');
        }

        // Enable docker service
        if (needToEnableDockerService) {
          await scriptFile.write('systemctl enable --now ' + commandJoin([dockerServiceName]) + '\n');
        }

        // Start docker service
        if (needToStartDockerService) {
          await scriptFile.write('systemctl start ' + commandJoin([dockerServiceName]) + '\n');
        }

        // Add user in docker group
        if (needUserInDockerGroup) {
          const { stdout, stderr } = await execFileProm('whoami');
          const userName = stdout.trim();

          await scriptFile.write(`usermod -aG docker ${userName}\n`);
        }

        scriptFile.chmod(0o500);
        scriptFile.close();

        const promise = new Promise<boolean>(async (resolve, reject) => {
          const options = {
            name: this.title
          };
          try {
            sudo.exec(scriptPath, options,
              function (error, stdout, stderr) {
                if (error) reject(error);
                resolve(true);
              }
            );
          } catch (error) {
            resolve(false);
          }
        });

        await promise.then(result => {
          commandResult = result;
        }).catch(reason => {
          commandResult = false;
        }).finally(async () => {
          await rm(scriptPath);
        });

      });

      return commandResult;
    } else {
      return true;
    }
  }

  async isUserInGroup(groupName: string): Promise<boolean> {
    const { stdout, stderr } = await execFileProm('groups');
    const groups = stdout.split(' ');
    return groups.findIndex(val => val === groupName) >= 0;
  }

  async checkForInstalledUbuntuPackage(packageName: string): Promise<boolean> {
    const { stdout, stderr } = await execFileProm('apt', ['-qq', 'list', packageName]);
    return stdout.indexOf('[installed]') > 0
  }

  async install(details: InstallDetails): Promise<boolean> {
    // Install and update eth-docker
    if (!await this.installUpdateEthDockerCode(details.network)) {
      return false;
    }

    // TODO: Create .env file with all the configuration details
    // TODO: Build the client
    // TODO: Import the keys
    // TODO: Start the clients

    return true;
  }

  async installUpdateEthDockerCode(network: Network): Promise<boolean> {
    const networkPath = path.join(installPath, network.toLocaleLowerCase());

    // Make sure the networkPath is a directory
    const networkPathExists = await doesFileExist(networkPath);
    const networkPathIsDir = networkPathExists && await doesDirectoryExist(networkPath);
    if (!networkPathExists) {
      await mkdir(networkPath, { recursive: true });
    } else if (networkPathExists && !networkPathIsDir) {
      await rm(networkPath);
      await mkdir(networkPath, { recursive: true });
    }

    const ethDockerPath = path.join(networkPath, 'eth-docker');

    const ethDockerPathExists = await doesFileExist(ethDockerPath);
    const ethDockerPathIsDir = ethDockerPathExists && await doesDirectoryExist(ethDockerPath);
    let needToClone = !ethDockerPathExists;

    if (ethDockerPathExists && !ethDockerPathIsDir) {
      await rm(ethDockerPath);
      needToClone = true;
    } else if (ethDockerPathIsDir) {
      // Check if eth-docker was already cloned.
      const execProm = execFileProm('git', ['remote', 'show', 'origin'], { cwd: ethDockerPath });
      const { stdout, stderr } = await execProm;

      if (execProm.child.exitCode === 0) {
        // Check for origin being ethDockerGitRepository
        const remoteMatch = stdout.match(/Fetch URL: (?<remote>.+)/);
        if (remoteMatch) {
          if (remoteMatch.groups?.remote.trim() === ethDockerGitRepository) {
            needToClone = false;
          } else {
            // Git repository with the wrong remote.
            await rm(ethDockerPath, { recursive: true, force: true });
            needToClone = true;
          }
        } else {
          console.log('Cannot parse `git remote show origin` output.');
          return false;
        }
      } else {
        // Not a git repository or does not have origin remote
        await rm(ethDockerPath, { recursive: true, force: true });
        needToClone = true;
      }
    }

    // Clone repository if needed
    if (needToClone) {
      const execProm = execFileProm('git', ['clone', ethDockerGitRepository], { cwd: networkPath });
      const { stdout, stderr } = await execProm;

      if (execProm.child.exitCode !== 0) {
        console.log('We failed to clone eth-docker repository.');
        return false;
      }
    }

    // Update repository
    const execProm = execFileProm('git', ['pull'], { cwd: ethDockerPath });
    const { stdout, stderr } = await execProm;

    if (execProm.child.exitCode !== 0) {
      console.log('We failed to update eth-docker repository.');
      return false;
    }

    return true;
  }

  async postInstall(): Promise<void> {
    // TODO: implement
    console.log("Executing postInstall");
    return;
  }

  async stopNodes(): Promise<void> {
    // TODO: implement
    console.log("Executing stopNodes");
    return;
  }

  async startNodes(): Promise<void> {
    // TODO: implement
    console.log("Executing startNodes");
    return;
  }

  async updateExecutionClient(): Promise<void> {
    // TODO: implement
    console.log("Executing updateExecutionClient");
    return;
  }

  async updateConsensusClient(): Promise<void> {
    // TODO: implement
    console.log("Executing updateConsensusClient");
    return;
  }

  async importKeys(keyStorePaths: string[]): Promise<KeyImportResult[]> {
    // TODO: implement
    console.log("Executing importKeys");
    const results: KeyImportResult[] = [
      {
        path: "path1",
        success: true,
      }, {
        path: "path2",
        success: false,
      }
    ]

    return results;
  }

  async exportKeys(keyStorePaths: string[]): Promise<KeyImportResult[]> {
    // TODO: implement
    console.log("Executing exportKeys");
    const results: KeyImportResult[] = [
      {
        path: "path1",
        success: true,
      }, {
        path: "path2",
        success: false,
      }
    ]

    return results;
  }

  async switchExecutionClient(targetClient: ExecutionClient): Promise<void> {
    // TODO: implement
    console.log("Executing switchExecutionClient");
    return;
  }

  async switchConsensusClient(targetClient: ConsensusClient): Promise<void> {
    // TODO: implement
    console.log("Executing switchConsensusClient");
    return;
  }

  async uninstall(): Promise<void> {
    // TODO: implement
    console.log("Executing uninstall");
    return;
  }


  // Data
  async getCurrentExecutionClient(): Promise<ExecutionClient> {
    // TODO: implement
    console.log("Executing getCurrentExecutionClient");
    return ExecutionClient.GETH;
  }

  async getCurrentConsensusClient(): Promise<ConsensusClient> {
    // TODO: implement
    console.log("Executing getCurrentConsensusClient");
    return ConsensusClient.LIGHTHOUSE;
  }

  async getCurrentExecutionClientVersion(): Promise<string> {
    // TODO: implement
    console.log("Executing getCurrentExecutionClientVersion");
    return "0.1";
  }

  async getCurrentConsensusClientVersion(): Promise<string> {
    // TODO: implement
    console.log("Executing getCurrentConsensusClientVersion");
    return "0.1";
  }

  async getLatestExecutionClientVersion(client: ExecutionClient): Promise<string> {
    // TODO: implement
    console.log("Executing getLatestExecutionClientVersion");
    return "0.1";
  }

  async getLatestConsensusClientVersion(client: ConsensusClient): Promise<string> {
    // TODO: implement
    console.log("Executing getLatestConsensusClientVersion");
    return "0.1";
  }

  async executionClientStatus(): Promise<NodeStatus> {
    // TODO: implement
    console.log("Executing executionClientStatus");
    return NodeStatus.UNKNOWN;
  }

  async consensusBeaconNodeStatus(): Promise<NodeStatus> {
    // TODO: implement
    console.log("Executing consensusBeaconNodeStatus");
    return NodeStatus.UNKNOWN;
  }

  async consensusValidatorStatus(): Promise<ValidatorStatus> {
    // TODO: implement
    console.log("Executing consensusValidatorStatus");
    return ValidatorStatus.UNKNOWN;
  }

  async consensusValidatorCount(): Promise<number> {
    // TODO: implement
    console.log("Executing consensusValidatorCount");
    return -1;
  }

  async executionClientPeerCount(): Promise<number> {
    // TODO: implement
    console.log("Executing executionClientPeerCount");
    return -1;
  }

  async consensusClientPeerCount(): Promise<number> {
    // TODO: implement
    console.log("Executing consensusClientPeerCount");
    return -1;
  }

  async executionClientLatestBlock(): Promise<number> {
    // TODO: implement
    console.log("Executing executionClientLatestBlock");
    return -1;
  }

  async consensusClientLatestBlock(): Promise<number> {
    // TODO: implement
    console.log("Executing consensusClientLatestBlock");
    return -1;
  }
}
