import React, { FC, ReactElement } from 'react';
import { Grid, Typography } from '@mui/material';
import StepNavigation from '../StepNavigation';
import styled from '@emotion/styled';

type ConfigurationProps = {
  onStepBack: () => void,
  onStepForward: () => void,
}

const ContentGrid = styled(Grid)`
  height: 320px;
  margin-top: 16px;
`;

/**
 * This page is the second step of the install process where the user inputs their configuration.
 * 
 * @param props the data and functions passed in, they are self documenting
 * @returns 
 */
const Configuration: FC<ConfigurationProps> = (props): ReactElement => {

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h1">
          Configuration
        </Typography>
      </Grid>
      <ContentGrid>

      </ContentGrid>
      {/* props.children is the stepper */}
      {props.children}
      <StepNavigation
        onPrev={props.onStepBack}
        onNext={props.onStepForward}
        backLabel={"Back"}
        nextLabel={"Install"}
        disableBack={false}
        disableNext={false}
      />
    </Grid>
  );
}

export default Configuration;
