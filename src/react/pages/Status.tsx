import {
  Black,
  Button,
  ButtonHover,
  DarkGray,
  Gray4,
  Heading,
  MainContent
} from "../colors";
import React, { useEffect, useState } from "react";
import { getEth2ClientName, openEth1Logs, openEth2BeaconLogs, openEth2ValidatorLogs, queryEth1PeerCount, queryEth1Status, queryEth1Syncing, queryEth2BeaconStatus, queryEth2ValidatorStatus, startNodes, stopNodes } from "../commands/RocketPool";

import Footer from "../components/Footer";
import { shell } from "electron";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height:100vh;
`;

const LandingHeader = styled.div`
  font-weight: 700;
  font-size: 35;
  margin-top: 50;
  color: ${Heading};
  max-width: 550;
  flex-grow:1;
`;


const Content = styled.div`
  color: ${MainContent};
  margin-top: 20;
  width: 650;
  flex-grow: 6;
`;

const ResultsTable = styled.table`
  border: 2px solid gray;
  width: 100%;
  padding: 15px;
  text-align: left;
  color: white;
`;

const StyledLink = styled.span`
  color: ${Heading};
  cursor: pointer;
`;

const LogsButton = styled.button`
  color: ${Black};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${Button};
  border-radius: 10px;
  text-decoration: none;

  transition: 250ms background-color ease;
  cursor: pointer;

  &:hover {
    background-color: ${ButtonHover};
  }

  &:disabled {
    cursor: default;
    color: ${DarkGray};
    background-color: ${Gray4};
  }
`;

// TODO: turn this into an enum?
const NodeStatus: [string, string, string][] = [
  ["Online", "\u2B24", "green"],     // 0
  ["Syncing", "\u2B24", "yellow"],   // 1
  ["Offline", "\u2B24", "red"],      // 2
  ["Loading...", "", ""]             // 3
]

// TODO: right after install, while nodes are starting up, this page says everything is "online"
// while things are looking for peers.  Need to improve that logic.

const Status = () => {
  const [eth1ContainerStatus, setEth1ContainerStatus] = useState(3);
  const [eth1PeerCount, setEth1PeerCount] = useState(0);
  const [eth1Syncing, setEth1Syncing] = useState(false);
  const [eth2ClientName, setEth2ClientName] = useState("");
  const [eth2BeaconContainerStatus, setEth2BeaconContainerStatus] = useState(3);
  const [eth2ValidatorContainerStatus, setEth2ValidatorContainerStatus] = useState(3);
  const eth2WagyuStatus = useState(3);

  useEffect(() => {
    setTimeout(() => {
      queryStatuses();
      setEth2ClientName(getEth2ClientName());
      computeEth2WagyuStatus();
      setInterval(queryStatuses, 5000);
    }, 500)
  }, []);

  const queryStatuses = () => {
    queryEth1Status(setEth1ContainerStatus);
    setEth1Syncing(queryEth1Syncing());
    setEth1PeerCount(queryEth1PeerCount());
    queryEth2BeaconStatus(setEth2BeaconContainerStatus);
    queryEth2ValidatorStatus(setEth2ValidatorContainerStatus);
  }

  const formatStatusIcon = (status: number) => {
    return (
      <span style={{ color: NodeStatus[status][2]}}>{NodeStatus[status][1]}</span>
    )
  }

  const eth1eth2synced = () => {
    return computeEth1Status() == 0 && computeEth2BeaconStatus() == 0;
  }

  const computeEth1Status = (): number => {
    if (eth1ContainerStatus == 3) {
      return 3;
    } else if (eth1ContainerStatus == 2) {
      return 2;
    } else if (eth1Syncing) {
      return 1;
    } else {
      return 0;
    }
  }

  const computeEth2BeaconStatus = () => {
    return eth2BeaconContainerStatus;
  }

  const computeEth2ValidatorStatus = () => {
    return eth2ValidatorContainerStatus;
  }

  const computeEth2WagyuStatus = (): number => {
    if (eth1ContainerStatus != 2) {
      return 1;
    } else if (eth2BeaconContainerStatus != 2) {
      return 1;
    } else if (eth2ValidatorContainerStatus != 2) {
      return 1;
    } else {
      return 2;
    }
  }
  const computeWagyuStartStop = () => {
    if (computeEth2WagyuStatus() == 2) {
      return 'start';
    } else if (computeEth2WagyuStatus() == 1) {
      return 'stop';
    } else if (computeEth2WagyuStatus() == 3) {
      return 'stand by';
    }
  }

  const renderNodeStatusTable = () => {
    return (
      <ResultsTable>
        <thead>
          <tr>
            <th>Application</th>
            <th>Status*</th>
            <th># Peers</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Eth1 Node - geth</td>
            <td>{formatStatusIcon(computeEth1Status())} {NodeStatus[computeEth1Status()][0]}</td>
            <td>{eth1PeerCount}</td>
            <td><LogsButton onClick={openEth1Logs} disabled={eth1ContainerStatus == 2}>View Logs</LogsButton></td>
          </tr>
          <tr>
            <td>Eth2 Beacon Node - {eth2ClientName}</td>
            <td>{formatStatusIcon(computeEth2BeaconStatus())} {NodeStatus[computeEth2BeaconStatus()][0]}</td>
            <td>-</td>
            <td><LogsButton onClick={openEth2BeaconLogs} disabled={eth2BeaconContainerStatus == 2}>View Logs</LogsButton></td>
          </tr>
          <tr>
            <td>Eth2 Validator - {eth2ClientName}</td>
            <td>{formatStatusIcon(computeEth2ValidatorStatus())} {NodeStatus[computeEth2ValidatorStatus()][0]}</td>
            <td>-</td>
            <td><LogsButton onClick={openEth2ValidatorLogs} disabled={eth2ValidatorContainerStatus == 2}>View Logs</LogsButton></td>
          </tr>
        </tbody>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td><LogsButton onClick={stopNodes} disabled={computeWagyuStartStop() == 'start'}>{computeWagyuStartStop()}</LogsButton></td>
          <td><LogsButton onClick={startNodes} disabled={computeWagyuStartStop() == 'stop'}>{computeWagyuStartStop()}</LogsButton></td>
          </tr>
        </tbody>
      </ResultsTable>
    )
  }

  const sendToEthStakerDiscord = () => {
    shell.openExternal("http://invite.gg/ethstaker");
  }

  const sendToEthStakerSubreddit = () => {
    shell.openExternal("https://www.reddit.com/r/ethstaker/");
  }

  const sendToGoerliEtherscan = () => {
    shell.openExternal("http://goerli.etherscan.io/");
  }

  const sendToPyrmontBeaconchain = () => {
    shell.openExternal("https://pyrmont.beaconcha.in/");
  }

  const sendToGetGoerliEth = () => {
    shell.openExternal("https://www.reddit.com/r/ethstaker/comments/ij56ox/best_way_to_get_goerli_ether/");
  }

  const sendToEthereumStudymaster = () => {
    shell.openExternal("https://ethereumstudymaster.com/");
  }

  const renderResources = () => {
    return (
      <ul>
        <li>Join the EthStaker <StyledLink onClick={sendToEthStakerDiscord}>discord</StyledLink></li>
        <li>Check out the EthStaker <StyledLink onClick={sendToEthStakerSubreddit}>subreddit</StyledLink></li>
        <li>Join the <StyledLink onClick={sendToEthereumStudymaster}>Ethereum Studymaster</StyledLink> program</li>
        <li>Grab some <StyledLink onClick={sendToGetGoerliEth}>Goerli ETH</StyledLink></li>
        <li>Familiarize yourself with <StyledLink onClick={sendToGoerliEtherscan}>etherscan</StyledLink> and <StyledLink onClick={sendToPyrmontBeaconchain}>beaconcha.in</StyledLink> </li>
      </ul>
    )
  }

  const renderSubText = () => {
    if (eth1eth2synced()) {
      return (
        <div>
          Resources:
          { renderResources() }
          If you have not deposited your Goerli eth yet, click Deposit.
        </div>
      )
    } else {
      return (
        <div>
          Syncing may take a while.. here are a few things to do:
          { renderResources() }
        </div>
      )
    }
  }

  const renderContent = () => {
    return(
      <Content>
        { renderNodeStatusTable() }
        <br />
        <br />
        *Note: "Syncing" state is only supported for Eth1.  Eth1 Beacon/Validator statuses are set based on docker status.
        <br />
        Supporting "Syncing" state for Eth2 Becon high priority feature to build.
        <br />
        <br />
        <br />
        { renderSubText() }
        {
          // TODO: file size for proxy of progress?
          // TODO: blinking dot for syncing and running
          // TODO: load right to status if rp is installed
          // TODO: additional data, maybe even pull some from beaconcha.in
          // TODO: add buttons to stop/start/update nodes
          // TODO: add button for logs
          // TODO: direct user to beaconcha.in to track their validator
          // TODO: button to configure alerts from beaconcha.in?
        }
      </Content>
    );
  }

  const renderFooter = () => {
    if (eth1eth2synced()) {
      return (
        <Footer backLink={"/systemcheck"} backLabel={"Back"} nextLink={"/deposit"} nextLabel={"Deposit"} />
      )
    } else {
      return (
        <Footer backLink={"/systemcheck"} backLabel={"Back"} nextLink={""} nextLabel={""} />
      )
    }
  }

  return (
    <Container>
      <LandingHeader>Status</LandingHeader>
      {renderContent()}
      {renderFooter()}
    </Container>
  )
}

export default Status;
