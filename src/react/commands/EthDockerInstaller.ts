import { ExecutionClient, ConsensusClient, IMultiClientInstaller, KeyImportResult, NodeStatus, SystemTestResult, ValidatorStatus } from "./IMultiClientInstaller";

export class EthDockerInstaller implements IMultiClientInstaller {

  // Functionality
  async runComputerSystemChecks(): Promise<SystemTestResult[]> {
    const results: SystemTestResult[] = [
      {
        name: "test1",
        result: true,
        remediation: "reboot"
      }, {
        name: "test2",
        result: true,
        remediation: "throw your computer"
      }
    ]

    return results;
  }

  async preInstall(): Promise<void> {
    // TODO: implement
    console.log("Executing preInstall");
    return;
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
