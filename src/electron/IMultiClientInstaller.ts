import { Network } from "../react/types"

export interface IMultiClientInstaller {

  // Functionality
  preInstall: () => Promise<boolean>,
  install: (details: InstallDetails) => Promise<boolean>,
  postInstall: (network: Network) => Promise<boolean>,

  stopNodes: (network: Network) => Promise<boolean>,
  startNodes: (network: Network) => Promise<boolean>,

  updateExecutionClient: () => Promise<void>,
  updateConsensusClient: () => Promise<void>,

  importKeys: (
    network: Network,
    keyStoreDirectoryPath: string,
    keyStorePassword: string) => Promise<boolean>,
  exportKeys: () => Promise<void>,

  switchExecutionClient: (targetClient: ExecutionClient) => Promise<boolean>,
  switchConsensusClient: (targetClient: ConsensusClient) => Promise<boolean>,

  uninstall: () => Promise<boolean>,


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
