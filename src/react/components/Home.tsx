import React from 'react';
import styled from 'styled-components';
import { shell } from 'electron';
import { Link, withRouter } from 'react-router-dom';
import { History } from 'history';
import { isRocketPoolInstalled } from '../commands/RocketPool';
import {
  Black,
  LightBlue,
  LightGreen,
  MediumBlue,
  Gray3,
  Red,
} from '../colors';
import { Header } from './typography/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LandingHeader = styled(Header)`
  margin-top: 120;
  text-align: center;
`;

const Content = styled.div`
  color: ${Gray3};
  margin-top: 40;
  max-width: 650;
`;

const StartButton = styled(Link)`
  color: ${Black};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 24;
  background-color: ${LightBlue};
  padding: 16 24;
  border-radius: 10%;
  text-decoration: none;

  transition: 250ms background-color ease;
  cursor: pointer;
  margin-top: 60;

  &:hover {
    background-color: ${LightGreen};
  }
`;

const StyledLink = styled.em`
  color: ${MediumBlue};
  cursor: pointer;
`;

const Testnet = styled.b`
  color: ${Red};
`;

export const Home = withRouter(({ history }: { history: History }) => {
  if (isRocketPoolInstalled()) {
    history.push('/status');
  }

  const sendToRocketpool = () => {
    shell.openExternal('https://www.rocketpool.net/');
  };

  return (
    <Container>
      <LandingHeader>Welcome to Wagyu</LandingHeader>
      <Content>
        This is your portal into the Eth2 world - welcome.
        <br />
        <br />
        <br />A one-click staking installer for the
        <Testnet>pyrmont testnet</Testnet>.
        <br />
        <br />
        <br />
        It will configure the following for you*:
        <ul>
          <li>Eth 1 Node</li>
          <li>Eth 2 Beacon Node</li>
          <li>Eth 2 Validator</li>
        </ul>
        <br />
        <br />
        *Note: we use the Rocket Pool install infrastructure which runs
        everything in docker, more info
        <StyledLink onClick={sendToRocketpool}>here</StyledLink>
      </Content>
      <StartButton to="/systemcheck">Enter</StartButton>
    </Container>
  );
});
