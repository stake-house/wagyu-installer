export enum StepKey {
  SystemCheck,
  Configuration,
  Installing
}

export enum StepSequenceKey {
  Install = "install"
}

export enum Network {
  PRATER = "Prater",
  MAINNET = "Mainnet"
}

export enum ExecutionNetwork {
  GOERLI = "goerli",
  MAINNET = "mainnet"
}

export const networkToExecution: Map<Network, ExecutionNetwork> = new Map([
  [Network.PRATER, ExecutionNetwork.GOERLI],
  [Network.MAINNET, ExecutionNetwork.MAINNET]
]);