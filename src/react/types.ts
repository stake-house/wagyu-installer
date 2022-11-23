export enum StepKey {
  SystemCheck,
  Configuration,
  Installing,
}

export enum StepSequenceKey {
  Install = "install",
}

export enum Network {
  PRATER = "Prater",
  MAINNET = "Mainnet",
  SEPOLIA = "Sepolia",
}

export enum ExecutionNetwork {
  GOERLI = "goerli",
  MAINNET = "mainnet",
  SEPOLIA = "Sepolia",
}

export const networkToExecution: Map<Network, ExecutionNetwork> = new Map([
  [Network.PRATER, ExecutionNetwork.GOERLI],
  [Network.MAINNET, ExecutionNetwork.MAINNET],
  [Network.SEPOLIA, ExecutionNetwork.SEPOLIA],
]);

export interface BeaconMeta {
  count: number;
}
export interface BeaconResponse<T> {
  data: T;
  meta: BeaconMeta;
}

export interface BeaconGetSyncingStatus {
  head_slot: string;
  sync_distance: string;
  is_syncing: boolean;
  is_optimistic: boolean;
}

export interface BeaconGetPeers {
  peer_id: string;
  enr: string;
  last_seen_p2p_address: string;
  state: string;
  direction: string;
}
