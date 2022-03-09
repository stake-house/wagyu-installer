import React, { FC, ReactElement } from "react";
import { Grid, Typography } from '@mui/material';
import { Network } from "../types";
import styled from '@emotion/styled';
import VersionFooter from "../components/VersionFooter";

const MainGrid = styled(Grid)`
  width: 100%;
  margin: 0px;
  text-align: center;
`;

type SystemOverviewProps = {
  network: Network
}

const SystemOverview: FC<SystemOverviewProps> = (props): ReactElement => {
  return (
    <MainGrid container spacing={5} direction="column">
      <Grid item container>
        <Grid item xs={10} />
        <Grid item xs={2}>
          <Typography variant="caption" style={{ color: "gray" }}>
            Network: {props.network}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h1">
          System Overview
        </Typography>
      </Grid>
      <VersionFooter />
    </MainGrid>
  );
};

export default SystemOverview;
