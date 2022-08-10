import React, { FC, ReactElement } from "react";
import { Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import VersionFooter from "../components/VersionFooter";
import { InstallDetails } from "../../electron/IMultiClientInstaller";

const MainGrid = styled(Grid)`
  width: 100%;
  margin: 0px;
  text-align: center;
`;

const Card = styled(Grid)`
  background: rgba(0, 94, 86, 0.2);
  border: 1px solid rgba(255, 166, 0, 0.3);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

type SystemOverviewProps = {
  installationDetails: InstallDetails
}

const SystemOverview: FC<SystemOverviewProps> = (props): ReactElement => {
  return (
    <MainGrid container spacing={0} direction="column">
     <Grid flex={"0 0"} container item>
      <h1>Overview</h1>
     </Grid>
     <Grid flex={"1 1"} item container>
      <Grid xs={6} padding={1} container item direction={"column"}>
        <Grid item>
          <h3>Beacon Node</h3>
        </Grid>
        <Card item>
          <div>Status</div>
          <div>Remaining</div>
          <div>DB Path</div>
        </Card>
      </Grid>
      <Grid xs={6} padding={1} container item direction={"column"}>
        <Grid item>
          <h3>Validator</h3>
        </Grid>
        <Card item>
          <div>Add validator keys</div>
          <div></div>
          <div></div>
        </Card>
      </Grid>
      <Grid xs={6} padding={1} container item direction={"column"}>
        <Grid item>
          <h3>Execution Node</h3>
        </Grid>
        <Card item>
          <div>Status</div>
          <div>Remaining</div>
          <div>DB Path</div>
        </Card>
      </Grid>
      <Grid xs={6} padding={1} container item direction={"column"}>
        <Grid item>
          <h3>System</h3>
        </Grid>
        <Card item>
          <div>Storage growth</div>
          <div>Storage left</div>
          <div>RAM</div>
          <div>CPU</div>
        </Card>
      </Grid>
     </Grid>

      <VersionFooter />
    </MainGrid>
  );
};

export default SystemOverview;


{/* <Grid item container>
<Grid item xs={10} />
<Grid item xs={2}>
  <Typography variant="caption" style={{ color: "gray" }}>
    Network: {props.installationDetails.network}
  </Typography>
</Grid>
</Grid>
<Grid item>
<Typography variant="h1">
  Installation Complete
</Typography>
<ul style={{ margin: '0 auto', width: '350px', marginTop: '3rem', textAlign: 'left'}}>
  <li>Network: {props.installationDetails.network}</li>
  <li>Consensus Client: {props.installationDetails.consensusClient}</li>
  <li>Execution Client: {props.installationDetails.executionClient}</li>
</ul>
</Grid> */}