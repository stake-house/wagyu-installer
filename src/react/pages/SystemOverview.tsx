import React, { FC, ReactElement } from "react";
import { Grid, Typography } from '@mui/material';
import { Network } from "../types";
import styled from '@emotion/styled';
import VersionFooter from "../components/VersionFooter";
import { InstallDetails } from "../../electron/IMultiClientInstaller";

const MainGrid = styled(Grid)`
  width: 100%;
  margin: 0px;
  text-align: center;
`;

type SystemOverviewProps = {
  installationDetails: InstallDetails
}

const SystemOverview: FC<SystemOverviewProps> = (props): ReactElement => {
  return (
    <MainGrid container spacing={5} direction="column">
      <Grid item container>
        <Grid item xs={10} />
        <Grid item xs={2}>
          <Typography variant="caption" style={{ color: "gray" }}>
            Network: {props.installationDetails.network}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h1">
          {/* System Overview */}
          Installation Complete
        </Typography>
        <ul style={{ margin: '0 auto', width: '350px', marginTop: '3rem', textAlign: 'left'}}>
          <li>Network: {props.installationDetails.network}</li>
          <li>Consensus Client: {props.installationDetails.consensusClient}</li>
          <li>Execution Client: {props.installationDetails.executionClient}</li>
        </ul>
      </Grid>
      <VersionFooter />
    </MainGrid>
  );
};

export default SystemOverview;
