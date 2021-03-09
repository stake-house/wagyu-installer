import { HashRouter, Route, Switch } from "react-router-dom";

import { Background } from "./colors";
import Deposit from "./pages/Deposit";
import Home from "./pages/Home";
import InstallFailed from "./pages/InstallFailed";
import Installing from "./pages/Installing";
import React from "react";
import Status from "./pages/Status";
import SystemCheck from "./pages/SystemCheck";
import styled from "styled-components";

const Container = styled.main`
  font-family: 'PT Mono', monospace;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${Background};
`;

const App = () => {
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

export default App;
