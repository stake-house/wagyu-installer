import React, { FC, ReactElement } from 'react';
import { Grid, Typography } from '@mui/material';
import StepNavigation from '../StepNavigation';
import styled from '@emotion/styled';

type InstallProps = {
  onStepBack: () => void,
  onStepForward: () => void,
}

const ContentGrid = styled(Grid)`
  height: 320px;
  margin-top: 16px;
`;

/**
 * This page is the third step of the install process where the software is being installed.
 * 
 * @param props the data and functions passed in, they are self documenting
 * @returns 
 */
const Install: FC<InstallProps> = (props): ReactElement => {

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h1">
          Installing
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
        nextLabel={"Next"}
        disableBack={false}
        disableNext={false}
      />
    </Grid>
  );
}

export default Install;
