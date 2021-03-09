import { doesFileExist, executeCommandAsync, executeCommandInNewTerminal, executeCommandSync, executeCommandSyncReturnStdout, executeCommandWithPromptsAsync, getFileFullPath } from "./ExecuteCommand";

import { Container } from 'node-docker-api/lib/container';
import { Docker } from "node-docker-api";
import fs from "fs";
import yaml from "js-yaml";

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

const ROCKET_POOL_EXECUTABLE = "~/bin/rocketpool";
const ROCKET_POOL_DIR = "~/.rocketpool"
const ROCKET_POOL_INSTALL_COMMAND = "curl -L https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 --create-dirs -o " + ROCKET_POOL_EXECUTABLE + " && chmod +x " + ROCKET_POOL_EXECUTABLE;
const GETH_SYNC_STATUS_CMD = "docker exec rocketpool_eth1 geth --exec 'eth.syncing' attach ipc:ethclient/geth/geth.ipc";
const GETH_PEERS_CMD = "docker exec rocketpool_eth1 geth --exec 'admin.peers.length' attach ipc:ethclient/geth/geth.ipc";

// TODO: make an installer interface and implement it here, so we can easily extend
// to utilize multiple different installers

// TODO: better error handling/logging

type Callback = (success: boolean) => void;
type NodeStatusCallback = (status: number) => void;

const getEth2ClientName = (): string => {
  try {
    const rpSettings: any = yaml.load(fs.readFileSync(getFileFullPath(ROCKET_POOL_DIR + '/settings.yml'), 'utf8'));
    const selectedClient = rpSettings["chains"]["eth2"]["client"]["selected"];

    return selectedClient;
  } catch (e) {
    console.log(e);
    return "";
  }
}

console.log(getEth2ClientName());

const isRocketPoolInstalled = (): boolean => {
  return doesFileExist(ROCKET_POOL_EXECUTABLE)
}

const installAndStartRocketPool = async (password: string, callback: Callback) => {
  const cliRc = executeCommandSync(ROCKET_POOL_INSTALL_COMMAND);
  if (cliRc != 0) {
    console.log("cli failed to install");
    callback(false);
    return;
  }

  // For some reason executeCommandWithPromptsAsync needs the full path, so fetching it here
  const rocketPoolExecutableFullPath = getFileFullPath(ROCKET_POOL_EXECUTABLE);
  console.log("full path");
  console.log(rocketPoolExecutableFullPath);

  const serviceRc = await executeCommandAsync("echo " + password + " | sudo -S " + rocketPoolExecutableFullPath + " --allow-root service install --yes --network pyrmont");
  if (serviceRc != 0) {
    console.log("service install failed to install");
    callback(false);
    return;
  }

  const promptRepsonses = [
    "1\n", // which eth1 client? 1 geth, 2 infura, 3 custom
    "\n",  // ethstats label
    "\n",  // ethstats login
    "y\n", // random eth2 client? y/n
    "\n"   // graffiti
  ]

  const serviceConfigRc = await executeCommandWithPromptsAsync(rocketPoolExecutableFullPath, ["service", "config"], promptRepsonses);
  if (serviceConfigRc != 0) {
    console.log("service config failed");
    callback(false);
    return;
  }

  // Just in case nodes were running - pick up new config.
  const stopNodesRc = stopNodes();
  if (stopNodesRc != 0) {
    console.log("stop nodes failed");
    callback(false);
  }

  const startNodesRc = startNodes();
  if (startNodesRc != 0) {
    console.log("start nodes failed");
    callback(false);
  }

  callback(true);
}

const startNodes = (): number => {
  return executeCommandSync(ROCKET_POOL_EXECUTABLE + " service start");
}

const stopNodes = (): number => {
  return executeCommandSync(ROCKET_POOL_EXECUTABLE + " service stop -y");
}

const openEth1Logs = () => {
  const openEth1LogsRc = executeCommandInNewTerminal(ROCKET_POOL_EXECUTABLE + " service logs eth1");
  if (openEth1LogsRc != 0) {
    console.log("failed to open eth1 logs");
    return;
  }
}

const openEth2BeaconLogs = () => {
  const openEth2BeaconLogsRc = executeCommandInNewTerminal(ROCKET_POOL_EXECUTABLE + " service logs eth2");
  if (openEth2BeaconLogsRc != 0) {
    console.log("failed to open eth2 beacon logs");
    return;
  }
}

const openEth2ValidatorLogs = () => {
  const openEth2ValidatorLogsRc = executeCommandInNewTerminal(ROCKET_POOL_EXECUTABLE + " service logs validator");
  if (openEth2ValidatorLogsRc != 0) {
    console.log("failed to open eth2 validator logs");
    return;
  }
}

// TODO: make this better - it is very fragile
const dockerContainerStatus = async (containerName: string, nodeStatusCallback: NodeStatusCallback) => {
  docker.container.list().then(
    (containers: Container[]) => {
      const filteredContainers = containers.filter((container => {
        const data: any = container.data;
        return data["Names"][0].includes(containerName);
      }))

      if (filteredContainers.length == 0) {
        nodeStatusCallback(2); // offline
      } else {
        const containerData: any = filteredContainers[0].data;
        const containerState: string = containerData["State"];
        if (containerState.includes("running")) {
          nodeStatusCallback(0); // online
        } else {
          nodeStatusCallback(2); // offline
        }
      }
    }).catch(() => {
      nodeStatusCallback(2); // offline
    })
}

const queryEth1Status = (nodeStatusCallback: NodeStatusCallback) => {
  dockerContainerStatus("rocketpool_eth1", nodeStatusCallback);
}

const queryEth2BeaconStatus = (nodeStatusCallback: NodeStatusCallback) => {
  dockerContainerStatus("rocketpool_eth2", nodeStatusCallback);
}

const queryEth2ValidatorStatus = (nodeStatusCallback: NodeStatusCallback) => {
  dockerContainerStatus("rocketpool_validator", nodeStatusCallback);
}

const queryEth1Syncing = (): boolean => {
  const syncValue = executeCommandSyncReturnStdout(GETH_SYNC_STATUS_CMD);
  return !syncValue.includes("false");
}

const queryEth1PeerCount = (): number => {
  const numPeers = executeCommandSyncReturnStdout(GETH_PEERS_CMD);
  const numPeersNumber = parseInt(numPeers.trim());
  return isNaN(numPeersNumber) ? 0 : numPeersNumber;
}

export {
  getEth2ClientName,
  isRocketPoolInstalled,
  installAndStartRocketPool,
  openEth1Logs,
  openEth2BeaconLogs,
  openEth2ValidatorLogs,
  startNodes,
  stopNodes,
  queryEth1PeerCount,
  queryEth1Status,
  queryEth1Syncing,
  queryEth2BeaconStatus,
  queryEth2ValidatorStatus,
}