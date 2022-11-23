import { Network } from "../react/types";

export interface IMultiClientInstaller {
  // Functionality
  preInstall: (outputLogs?: OutputLogs) => Promise<boolean>;
  install: (details: InstallDetails, outputLogs?: OutputLogs) => Promise<boolean>;
  postInstall: (network: Network, outputLogs?: OutputLogs) => Promise<boolean>;

  stopNodes: (network: Network, outputLogs?: OutputLogs) => Promise<boolean>;
  startNodes: (network: Network, outputLogs?: OutputLogs) => Promise<boolean>;

  updateExecutionClient: (outputLogs?: OutputLogs) => Promise<void>;
  updateConsensusClient: (outputLogs?: OutputLogs) => Promise<void>;

  importKeys: (
    network: Network,
    keyStoreDirectoryPath: string,
    keyStorePassword: string,
    outputLogs?: OutputLogs,
  ) => Promise<boolean>;
  exportKeys: () => Promise<void>;

  switchExecutionClient: (
    targetClient: ExecutionClient,
    outputLogs?: OutputLogs,
  ) => Promise<boolean>;
  switchConsensusClient: (
    targetClient: ConsensusClient,
    outputLogs?: OutputLogs,
  ) => Promise<boolean>;

  uninstall: (outputLogs?: OutputLogs) => Promise<boolean>;

  // Data
  getCurrentExecutionClient: () => Promise<ExecutionClient>;
  getCurrentConsensusClient: () => Promise<ConsensusClient>;

  getCurrentExecutionClientVersion: () => Promise<string>;
  getCurrentConsensusClientVersion: () => Promise<string>;

  getLatestExecutionClientVersion: (client: ExecutionClient) => Promise<string>;
  getLatestConsensusClientVersion: (client: ConsensusClient) => Promise<string>;

  executionClientStatus: () => Promise<NodeStatus>;
  consensusBeaconNodeStatus: () => Promise<NodeStatus>;
  consensusValidatorStatus: () => Promise<ValidatorStatus>;

  consensusValidatorCount: () => Promise<number>;

  executionClientPeerCount: () => Promise<number>;
  consensusClientPeerCount: () => Promise<number>;

  executionClientLatestBlock: () => Promise<number>;
  consensusClientLatestBlock: () => Promise<number>;

  // TODO: logs stream
}

export interface OutputLogs {
  (message: string, progress?: number): void;
}

export interface Progress {
  (percent: number): void;
}

export type InstallDetails = {
  debug: boolean;
  network: Network;
  executionClient: ExecutionClient;
  consensusClient: ConsensusClient;
};

export enum NodeStatus {
  UP_AND_SYNCED,
  UP_AND_SYNCING,
  DOWN,
  LOOKING_FOR_PEERS,
  UNKNOWN,
}

export enum ValidatorStatus {
  UP_AND_VALIDATING,
  UP_NOT_VALIDATING,
  DOWN,
  UNKNOWN,
}

// Supported clients
export enum ExecutionClient {
  GETH = "geth",
  NETHERMIND = "nethermind",
  BESU = "besu",
  ERIGON = "erigon",
}

export enum ConsensusClient {
  TEKU = "teku",
  NIMBUS = "nimbus",
  LIGHTHOUSE = "lighthouse",
  PRYSM = "prysm",
  LODESTAR = "lodestar",
}
