import { doesFileExist, readlink } from "./BashUtils";
import { executeCommandInNewTerminal, executeCommandSync, executeCommandSyncReturnStdout, executeCommandWithPromptsAsync } from "./ExecuteCommand";

import fs from "fs";
import yaml from "js-yaml";

const ASKPASS_PATH = "src/scripts/askpass.sh";

const ROCKET_POOL_EXECUTABLE = "~/bin/rocketpool";
const ROCKET_POOL_DIR = "~/.rocketpool"
const ROCKET_POOL_INSTALL_COMMAND = "curl -L https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 --create-dirs -o " + ROCKET_POOL_EXECUTABLE + " && chmod +x " + ROCKET_POOL_EXECUTABLE;

const GETH_SYNC_STATUS_DOCKER_CMD = "docker exec rocketpool_eth1 geth --exec 'eth.syncing' attach ipc:ethclient/geth/geth.ipc";
const GETH_PEERS_DOCKER_CMD = "docker exec rocketpool_eth1 geth --exec 'admin.peers.length' attach ipc:ethclient/geth/geth.ipc";

// TODO: make an installer interface and implement it here, so we can easily extend
// to utilize multiple different installers

// TODO: better error handling/logging

type Callback = (success: boolean) => void;
type NodeStatusCallback = (status: number) => void;

const wrapCommandInDockerGroup = (command: string) => {
  return "sg docker \"" + command + "\"";
}

// TODO: make this better, it is pretty brittle and peeks into the RP settings implementation
// this is required because we select the client at random, so we need to show the user what is running
const getEth2ClientName = (): string => {
  try {
    const rpSettings: any = yaml.load(fs.readFileSync(readlink(ROCKET_POOL_DIR + '/settings.yml'), 'utf8'));
    const selectedClient = rpSettings["chains"]["eth2"]["client"]["selected"];

    return selectedClient;
  } catch (e) {
    console.log(e);
    return "";
  }
}

const installAndStartRocketPool = async (callback: Callback) => {
  // cache sudo credentials to be used for install later
  const passwordRc = executeCommandSync("export SUDO_ASKPASS='" + ASKPASS_PATH + "' && sudo -A echo 'Authentication successful.'");
  if (passwordRc != 0) {
    console.log("password failed");
    callback(false);
    return;
  }

  const cliRc = executeCommandSync(ROCKET_POOL_INSTALL_COMMAND);
  if (cliRc != 0) {
    console.log("cli failed to install");
    callback(false);
    return;
  }

  const serviceRc = executeCommandSync(ROCKET_POOL_EXECUTABLE + " service install --yes --network pyrmont")
  if (serviceRc != 0) {
    console.log("service install failed");
    callback(false);
    return;
  }

  // For some reason executeCommandWithPromptsAsync needs the full path, so fetching it here
  const rocketPoolExecutableFullPath = readlink(ROCKET_POOL_EXECUTABLE);
  console.log("full path");
  console.log(rocketPoolExecutableFullPath);

  const promptResponses = [
    "1\n", // which eth1 client? 1 geth, 2 infura, 3 custom
    "\n",  // ethstats label
    "\n",  // ethstats login
    "y\n", // random eth2 client? y/n
    "\n"   // graffiti
  ]

  const serviceConfigRc = await executeCommandWithPromptsAsync(rocketPoolExecutableFullPath, ["service", "config"], promptResponses);
  if (serviceConfigRc != 0) {
    console.log("service config failed");
    callback(false);
    return;
  }

  // Just in case nodes were running - pick up new config (might happen anyway on start, not sure)
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

const isRocketPoolInstalled = (): boolean => {
  return doesFileExist(ROCKET_POOL_EXECUTABLE)
}

const openEth1Logs = () => {
  const openEth1LogsRc = executeCommandInNewTerminal(wrapCommandInDockerGroup("docker container logs -f rocketpool_eth1"), "eth1 (geth) logs");
  if (openEth1LogsRc != 0) {
    console.log("failed to open eth1 logs");
    return;
  }
}

const openEth2BeaconLogs = () => {
  const openEth2BeaconLogsRc = executeCommandInNewTerminal(wrapCommandInDockerGroup("docker container logs -f rocketpool_eth2"), "eth2 beacon node (" + getEth2ClientName() + ") logs");
  if (openEth2BeaconLogsRc != 0) {
    console.log("failed to open eth2 beacon logs");
    return;
  }
}

const openEth2ValidatorLogs = () => {
  const openEth2ValidatorLogsRc = executeCommandInNewTerminal(wrapCommandInDockerGroup("docker container logs -f rocketpool_validator"), "eth2 validator (" + getEth2ClientName() + ") logs");
  if (openEth2ValidatorLogsRc != 0) {
    console.log("failed to open eth2 validator logs");
    return;
  }
}

const startNodes = (): number => {
  return executeCommandSync(wrapCommandInDockerGroup(ROCKET_POOL_EXECUTABLE + " service start"));
}

const stopNodes = (): number => {
  return executeCommandSync(wrapCommandInDockerGroup(ROCKET_POOL_EXECUTABLE + " service stop -y"));
}

const queryEth1PeerCount = (): number => {
  const numPeers = executeCommandSyncReturnStdout(wrapCommandInDockerGroup(GETH_PEERS_DOCKER_CMD));
  const numPeersNumber = parseInt(numPeers.trim());
  return isNaN(numPeersNumber) ? 0 : numPeersNumber;
}

const queryEth1Status = (nodeStatusCallback: NodeStatusCallback) => {
  dockerContainerStatus("rocketpool_eth1", nodeStatusCallback);
}

const queryEth1Syncing = (): boolean => {
  const syncValue = executeCommandSyncReturnStdout(wrapCommandInDockerGroup(GETH_SYNC_STATUS_DOCKER_CMD));
  return !syncValue.includes("false");
}

const queryEth2BeaconStatus = (nodeStatusCallback: NodeStatusCallback) => {
  dockerContainerStatus("rocketpool_eth2", nodeStatusCallback);
}

const queryEth2ValidatorStatus = (nodeStatusCallback: NodeStatusCallback) => {
  dockerContainerStatus("rocketpool_validator", nodeStatusCallback);
}

// TODO: make this better - it is very fragile
const dockerContainerStatus = async (containerName: string, nodeStatusCallback: NodeStatusCallback) => {
  const containerId = executeCommandSyncReturnStdout(wrapCommandInDockerGroup("docker ps -q -f name=" + containerName));

  if (containerId.trim()) {
    nodeStatusCallback(0); // online
  } else {
    nodeStatusCallback(2); // offline
  }
}

export {
  getEth2ClientName,
  installAndStartRocketPool,
  isRocketPoolInstalled,
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