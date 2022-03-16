import sudo from 'sudo-prompt';

import {
  ExecutionClient,
  ConsensusClient,
  IMultiClientInstaller,
  KeyImportResult,
  NodeStatus,
  ValidatorStatus
} from "./IMultiClientInstaller";

export class EthDockerInstaller implements IMultiClientInstaller {

  title = 'Electron';

  async preInstall(): Promise<boolean> {
    console.log('preInstall called');
    // We need updated packages

    if (!await this.ubuntuAptUpdate()) {
      return false;
    };

    // We need git installed

    const gitPackageName = 'git';

    const gitInstalled = await this.checkForInstalledUbuntuPackage(gitPackageName);
    if (!gitInstalled) {
      if (!await this.installUbuntuPackage(gitPackageName)) {
        return false;
      }
    }

    // We need docker installed

    const dockerPackageName = 'docker-compose';

    const dockerInstalled = await this.checkForInstalledUbuntuPackage(dockerPackageName);
    if (!dockerInstalled) {
      if (!await this.installUbuntuPackage(dockerPackageName)) {
        return false;
      }
    }

    // TODO: We need docker service enabled
    // TODO: We need our user to be in docker group
    return false;
  }

  async ubuntuAptUpdate(): Promise<boolean> {
    console.log('ubuntuAptUpdate called')
    const promise = new Promise<boolean>((resolve, reject) => {
      const options = {
        name: this.title
      };
      try {
        sudo.exec('apt -y update', options,
          function (error, stdout, stderr) {
            if (error) throw error;
            console.log(stdout);
            resolve(true);
          }
        );
      } catch (error) {
        resolve(false);
      }
    });
    return promise;
  }

  async checkForInstalledUbuntuPackage(packageName: string): Promise<boolean> {
    console.log('checkForInstalledUbuntuPackage called')
    // TODO: implement
    return false;
  }

  async installUbuntuPackage(packageName: string): Promise<boolean> {
    console.log('installUbuntuPackage called')
    // TODO: implement
    return false;
  }

  async install(): Promise<void> {
    // TODO: implement
    console.log("Executing install");
    return;
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
