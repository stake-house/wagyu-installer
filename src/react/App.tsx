import { HashRouter, Route, Routes } from "react-router-dom";
import React, { FC, ReactElement, useState } from "react";
import styled from '@emotion/styled';
import Home from "./pages/Home";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from "@mui/material";
import '@fontsource/roboto';
import MainWizard from "./pages/MainWizard";
import theme from "./theme";
import { Network } from './types';
import SystemOverview from "./pages/SystemOverview";
import { ConsensusClient, ExecutionClient, InstallDetails } from "../electron/IMultiClientInstaller";

const Container = styled.main`
  display: block;
  padding: 20px;
  height: inherit;
  width: inherit;
  padding-bottom: 45px;
`;
// /systemOverview
/**
 * The React app top level including theme and routing.
 * 
 * @returns the react element containing the app
 */
const App: FC = (): ReactElement => {
  // const [network, setNetwork] = useState<Network>(Network.PRATER);
  const [installationDetails, setInstallationDetails] = useState<InstallDetails>({
      debug: true,
      consensusClient: ConsensusClient.PRYSM,
      executionClient: ExecutionClient.GETH,
      network: Network.PRATER
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Container>
          <Routes>
            {/* <Route path="/" element={<Home installationDetails={installationDetails} setInstallationDetails={setInstallationDetails} />} /> */}
            {/* <Route path="/wizard/:stepSequenceKey" element={<MainWizard installationDetails={installationDetails} setInstallationDetails={setInstallationDetails} />} /> */}
            <Route path="/" element={<SystemOverview installationDetails={installationDetails} />} />
            
          </Routes>
        </Container>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
