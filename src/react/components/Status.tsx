import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import {
  Black,
  LightBlue,
  LightGreen,
  DarkGray,
  Gray4,
  MediumBlue,
  Gray3,
} from '../colors';
import { Status, AllStatuses, NodeStatuses } from '../types';
import {
  sendToEthStakerDiscord,
  sendToEthStakerSubreddit,
  sendToGoerliEtherscan,
  sendToPyrmontBeaconchain,
  sendToGetGoerliEth,
  sendToEthereumStudymaster,
} from '../utils';
import {
  getEth2ClientName,
  openEth1Logs,
  openEth2BeaconLogs,
  openEth2ValidatorLogs,
  queryEth1PeerCount,
  queryEth1Status,
  queryEth1Syncing,
  queryEth2BeaconStatus,
  queryEth2ValidatorStatus,
  startNodes,
  stopNodes,
} from '../commands/RocketPool';
import { Footer } from './Footer';

const NodeStatus: NodeStatuses = {
  Online: { code: 0, text: 'Online', character: '\u2B24', color: 'green' },
  Syncing: { code: 1, text: 'Syncing', character: '\u2B24', color: 'yellow' },
  Offline: { code: 2, text: 'Offline', character: '\u2B24', color: 'red' },
  Loading: { code: 3, text: 'Loading...', character: '', color: '' },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LandingHeader = styled.div`
  font-weight: 700;
  font-size: 35;
  margin-top: 50;
  color: ${Heading};
  max-width: 550;
  flex-grow: 1;
`;

const Content = styled.div`
  color: ${Gray3};
  margin-top: 20;
  width: 650;
  flex-grow: 6;
`;

const ResultsTable = styled.table`
  border: 2px solid gray;
  width: 100%;
  padding: ${rem(15)};
  text-align: left;
  color: white;
`;

const StyledLink = styled.span`
  color: ${MediumBlue};
  cursor: pointer;
`;

const LogsButton = styled.button`
  color: ${Black};
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${LightBlue};
  border-radius: ${rem(10)};
  text-decoration: none;

  transition: 250ms background-color ease;
  cursor: pointer;

  &:hover {
    background-color: ${LightGreen};
  }

  &:disabled {
    cursor: default;
    color: ${DarkGray};
    background-color: ${Gray4};
  }
`;

// TODO: right after install, while nodes are starting up, this page says everything is "online"
// while things are looking for peers.  Need to improve that logic.

export const StatusPage = () => {
  const [eth1ContainerStatus, setEth1ContainerStatus] = useState<Status>(
    Status.Loading,
  );
  const [eth1PeerCount, setEth1PeerCount] = useState(0);
  const [eth1Syncing, setEth1Syncing] = useState(false);
  const [eth2ClientName, setEth2ClientName] = useState('');
  const [eth2BeaconContainerStatus, setEth2BeaconContainerStatus] =
    useState<Status>(Status.Loading);
  const [eth2ValidatorContainerStatus, setEth2ValidatorContainerStatus] =
    useState<Status>(Status.Loading);
  const [ProcessingTotalStatus, setProcessingTotalStatus] = useState<Status>(
    Status.Online,
  );

  useEffect(() => {
    setTimeout(() => {
      queryStatuses();
      setEth2ClientName(getEth2ClientName());
      setInterval(queryStatuses, 5000);
    }, 500);
  }, []);

  const queryStatuses = () => {
    queryEth1Status(setEth1ContainerStatus);
    setEth1Syncing(queryEth1Syncing());
    setEth1PeerCount(queryEth1PeerCount());
    queryEth2BeaconStatus(setEth2BeaconContainerStatus);
    queryEth2ValidatorStatus(setEth2ValidatorContainerStatus);
  };

  const formatStatusIcon = (status: Status) => {
    return (
      <span style={{ color: NodeStatus[status].color }}>
        {NodeStatus[status].character}
      </span>
    );
  };

  const formatTotalStatusButton = (running: boolean) => {
    const toggleTotalStatus = async () => {
      if (!running) {
        startNodes();
        setProcessingTotalStatus(Status.Syncing);
      } else {
        stopNodes();
        setProcessingTotalStatus(Status.Offline);
      }
    };
    let text = running ? 'Stop All' : 'Start All';
    if (ProcessingTotalStatus) text = 'Processing...';
    let totalStatusChanged =
      (ProcessingTotalStatus === Status.Syncing && running) ||
      (ProcessingTotalStatus === Status.Offline && !running);
    if (totalStatusChanged) setProcessingTotalStatus(Status.Online);
    return (
      <LogsButton
        onClick={toggleTotalStatus}
        disabled={ProcessingTotalStatus !== Status.Online}
      >
        {text}
      </LogsButton>
    );
  };

  const eth1eth2synced = () => {
    return (
      computeEth1Status() === Status.Loading &&
      eth2BeaconContainerStatus === Status.Online
    );
  };

  const computeEth1Status = (): AllStatuses => {
    if (eth1ContainerStatus === Status.Loading) {
      return Status.Loading;
    } else if (eth1ContainerStatus === Status.Offline) {
      return Status.Offline;
    } else if (eth1Syncing) {
      return Status.Syncing;
    } else {
      return Status.Online;
    }
  };

  const computeTotalStatus = () => {
    return !(
      computeEth1Status() === Status.Offline &&
      eth2BeaconContainerStatus === Status.Offline &&
      eth2ValidatorContainerStatus === Status.Offline
    );
  };

  const renderNodeStatusTable = () => {
    return (
      <ResultsTable>
        <thead>
          <tr>
            <th colSpan={3} />
            <th style={{ width: '100px' }}>
              {formatTotalStatusButton(computeTotalStatus())}
            </th>
          </tr>
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
            <td>
              {formatStatusIcon(computeEth1Status())}
              {NodeStatus[computeEth1Status()].text}
            </td>
            <td>{eth1PeerCount}</td>
            <td>
              <LogsButton
                onClick={openEth1Logs}
                disabled={eth1ContainerStatus === Status.Offline}
              >
                View Logs
              </LogsButton>
            </td>
          </tr>
          <tr>
            <td>Eth2 Beacon Node - {eth2ClientName}</td>
            <td>
              {formatStatusIcon(eth2BeaconContainerStatus)}
              {NodeStatus[eth2BeaconContainerStatus].text}
            </td>
            <td>-</td>
            <td>
              <LogsButton
                onClick={openEth2BeaconLogs}
                disabled={eth2BeaconContainerStatus === Status.Offline}
              >
                View Logs
              </LogsButton>
            </td>
          </tr>
          <tr>
            <td>Eth2 Validator - {eth2ClientName}</td>
            <td>
              {formatStatusIcon(eth2ValidatorContainerStatus)}
              {NodeStatus[eth2ValidatorContainerStatus].text}
            </td>
            <td>-</td>
            <td>
              <LogsButton
                onClick={openEth2ValidatorLogs}
                disabled={eth2ValidatorContainerStatus === Status.Offline}
              >
                View Logs
              </LogsButton>
            </td>
          </tr>
        </tbody>
      </ResultsTable>
    );
  };

  const renderResources = () => {
    return (
      <ul>
        <li>
          Join the EthStaker
          <StyledLink onClick={sendToEthStakerDiscord}>discord</StyledLink>
        </li>
        <li>
          Check out the EthStaker
          <StyledLink onClick={sendToEthStakerSubreddit}>subreddit</StyledLink>
        </li>
        <li>
          Join the
          <StyledLink onClick={sendToEthereumStudymaster}>
            Ethereum Studymaster
          </StyledLink>
          program
        </li>
        <li>
          Grab some
          <StyledLink onClick={sendToGetGoerliEth}>Goerli ETH</StyledLink>
        </li>
        <li>
          Familiarize yourself with
          <StyledLink onClick={sendToGoerliEtherscan}>etherscan</StyledLink> and
          <StyledLink onClick={sendToPyrmontBeaconchain}>
            beaconcha.in
          </StyledLink>
        </li>
      </ul>
    );
  };

  const renderSubText = () => {
    if (eth1eth2synced()) {
      return (
        <div>
          Resources:
          {renderResources()}
          If you have not deposited your Goerli eth yet, click Deposit.
        </div>
      );
    } else {
      return (
        <div>
          Syncing may take a while.. here are a few things to do:
          {renderResources()}
        </div>
      );
    }
  };

  const renderContent = () => {
    return (
      <Content>
        {renderNodeStatusTable()}
        <br />
        <br />
        *Note: "Syncing" state is only supported for Eth1. Eth1 Beacon/Validator
        statuses are set based on docker status.
        <br />
        Supporting "Syncing" state for Eth2 Becon high priority feature to
        build.
        <br />
        <br />
        <br />
        {renderSubText()}
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
  };

  const renderFooter = () => {
    if (eth1eth2synced()) {
      return (
        <Footer
          backLink={'/systemcheck'}
          backLabel={'Back'}
          nextLink={'/deposit'}
          nextLabel={'Deposit'}
        />
      );
    } else {
      return (
        <Footer
          backLink={'/systemcheck'}
          backLabel={'Back'}
          nextLink={''}
          nextLabel={''}
        />
      );
    }
  };

  return (
    <Container>
      <LandingHeader>Status</LandingHeader>
      {renderContent()}
      {renderFooter()}
    </Container>
  );
};
