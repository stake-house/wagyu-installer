import { Network } from "../react/types"

export interface IMultiClientInstaller {

  // Functionality
  preInstall: () => Promise<boolean>,
  install: (details: InstallDetails) => Promise<boolean>,
  postInstall: () => Promise<void>,

  stopNodes: () => Promise<void>,
  startNodes: () => Promise<void>,

  updateExecutionClient: () => Promise<void>,
  updateConsensusClient: () => Promise<void>,

  importKeys: (keyStorePaths: string[]) => Promise<KeyImportResult[]>,
  exportKeys: (keyStorePaths: string[]) => Promise<KeyImportResult[]>,

  switchExecutionClient: (targetClient: ExecutionClient) => Promise<void>,
  switchConsensusClient: (targetClient: ConsensusClient) => Promise<void>,

  uninstall: () => Promise<void>,


  // Data
  getCurrentExecutionClient: () => Promise<ExecutionClient>,
  getCurrentConsensusClient: () => Promise<ConsensusClient>,

  getCurrentExecutionClientVersion: () => Promise<string>,
  getCurrentConsensusClientVersion: () => Promise<string>,

  getLatestExecutionClientVersion: (client: ExecutionClient) => Promise<string>,
  getLatestConsensusClientVersion: (client: ConsensusClient) => Promise<string>,

  executionClientStatus: () => Promise<NodeStatus>,
  consensusBeaconNodeStatus: () => Promise<NodeStatus>,
  consensusValidatorStatus: () => Promise<ValidatorStatus>,

  consensusValidatorCount: () => Promise<number>,

  executionClientPeerCount: () => Promise<number>,
  consensusClientPeerCount: () => Promise<number>,

  executionClientLatestBlock: () => Promise<number>,
  consensusClientLatestBlock: () => Promise<number>,

  // TODO: logs stream
}

export type InstallDetails = {
  network: Network,
  executionClient: ExecutionClient,
  consensusClient: ConsensusClient,
  keyDirectory: string
}

export type KeyImportResult = {
  path: string,
  success: boolean,
}

export enum NodeStatus {
  UP_AND_SYNCED,
  UP_AND_SYNCING,
  DOWN,
  UNKNOWN,
}

export enum ValidatorStatus {
  UP_AND_VALIDATING,
  UP_NOT_VALIDATING,
  DOWN,
  UNKNOWN
}

// Supported clients
export enum ExecutionClient {
  GETH = "geth",
  NETHERMIND = "nethermind",
  BESU = "besu",
  ERIGON = "erigon"
}

export enum ConsensusClient {
  TEKU = "teku",
  NIMBUS = "nimbus",
  LIGHTHOUSE = "lighthouse",
  PRYSM = "prysm",
  LODESTAR = "lodestar"
}
