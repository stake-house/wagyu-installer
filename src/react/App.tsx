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

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

/**
 * The React app top level including theme and routing.
 * 
 * @returns the react element containing the app
 */
const App: FC = (): ReactElement => {
  const [network, setNetwork] = useState<Network>(Network.PRATER);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Container>
          <Routes>
            <Route path="/" element={<Home network={network} setNetwork={setNetwork} />} />
            <Route path="/wizard/:stepSequenceKey" element={<MainWizard network={network} />} />
            <Route path="/systemOverview" element={<SystemOverview network={network} />} />
          </Routes>
        </Container>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
