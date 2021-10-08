interface IMultiClientInstaller {

  // Functionality
  runComputerSystemChecks: () => Promise<SystemTestResult[]>,
  
  preInstall: () => Promise<void>,
  install: () => Promise<void>,
  postInstall: () => Promise<void>,

  stopNodes: () => Promise<void>,
  startNodes: () => Promise<void>,

  updateEth1Client: () => Promise<void>,
  updateEth2Client: () => Promise<void>,

  importKeys: (keyStorePaths: string[]) => Promise<KeyImportResult[]>,

  switchEth1Client: (targetClient: Eth1Client) => Promise<void>,
  switchEth2Client: (targetClient: Eth2Client) => Promise<void>,


  // Data
  getCurrentEth1Client: () => Promise<Eth1Client>,
  getCurrentEth2Client: () => Promise<Eth2Client>,

  getCurrentEth1ClientVersion: () => Promise<string>,
  getCurrentEth2ClientVersion: () => Promise<string>,

  getLatestEth1ClientVersion: (client: Eth1Client) => Promise<string>,
  getLatestEth2ClientVersion: (client: Eth2Client) => Promise<string>,

  eth1Status: () => Promise<NodeStatus>,
  eth2BeaconNodeStatus: () => Promise<Node>,
  eth2ValidatorStatus: () => Promise<ValidatorStatus>,

  eth2ValidatorCount: () => Promise<number>,

  eth1PeerCount: () => Promise<number>,
  eth2PeerCount: () => Promise<number>,

  eth1LatestBlock: () => Promise<number>,
  eth2LatestBlock: () => Promise<number>,

  // TODO: how do we want to handle logs?
}


type SystemTestResult = {
  name: string;
  result: boolean;
  remediation: string;
}

type KeyImportResult = {
  path: string,
  success: boolean,
}

enum NodeStatus {
  UP_AND_SYNCED,
  UP_AND_SYNCING,
  DOWN,
  UNKNOWN,
}

enum ValidatorStatus {
  UP_AND_VALIDATING,
  UP_NOT_VALIDATING,
  DOWN,
  UNKNOWN
}

// Supported clients
enum Eth1Client {
  GETH = "geth",
  NETHERMIND = "nethermind",
}

enum Eth2Client {
  TEKU = "teku",
  NIMBUS = "nimbus",
  LIGHTHOUSE = "lighthouse",
  PRYSM = "prysm",
}

export {
  Eth1Client,
  Eth2Client,
  IMultiClientInstaller
};
