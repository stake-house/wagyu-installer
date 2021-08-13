import React from 'react';
import styled from 'styled-components';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Slate1 } from './colors';
import { Deposit } from './components/Deposit';
import { Home } from './components/Home';
import { InstallFailed } from './components/InstallFailed';
import { Installing } from './components/Installing';
import { StatusPage as Status } from './components/Status';
import { SystemCheck } from './components/SystemCheck';

const Container = styled.main`
  font-family: 'PT Mono', monospace;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${Slate1};
`;

export const App = () => {
  return (
    <HashRouter>
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/systemcheck" component={SystemCheck} />
          <Route exact path="/installing" component={Installing} />
          <Route exact path="/installfailed" component={InstallFailed} />
          <Route exact path="/status" component={Status} />
          <Route exact path="/deposit" component={Deposit} />
        </Switch>
      </Container>
    </HashRouter>
  );
};
