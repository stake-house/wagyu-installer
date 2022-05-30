import React, { FC, ReactElement } from 'react';
import { Grid, Typography, Fab, CircularProgress, Box } from '@mui/material';
import StepNavigation from '../StepNavigation';
import { DoneOutline, DownloadingOutlined, ComputerOutlined, RocketLaunchOutlined  } from '@mui/icons-material';
import styled from '@emotion/styled';

import { green } from '@mui/material/colors';

type InstallProps = {
  onStepBack: () => void,
  onStepForward: () => void,
}

const ContentGrid = styled(Grid)`
  height: 320px;
  margin-top: 16px;
  margin-bottom: 16px;
`;


/**
 * This page is the third step of the install process where the software is being installed.
 * 
 * @param props the data and functions passed in, they are self documenting
 * @returns 
 */
const Install: FC<InstallProps> = (props): ReactElement => {

  const [loadingPreInstall, setLoadingPreInstall] = React.useState(false);
  const [loadingInstall, setLoadingInstall] = React.useState(false);
  const [loadingPostInstall, setLoadingPostInstall] = React.useState(false);
  const [successPreInstall, setSuccessPreInstall] = React.useState(false);
  const [successInstall, setSuccessInstall] = React.useState(false);
  const [successPostInstall, setSuccessPostInstall] = React.useState(false);
  const timerPreInstall = React.useRef<number>();
  const timerInstall = React.useRef<number>();
  const timerPostInstall = React.useRef<number>();

  const buttonPreInstallSx = {
    ...(successPreInstall && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const buttonInstallSx = {
    ...(successInstall && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const buttonPostInstallSx = {
    ...(successPostInstall && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timerPostInstall.current);
      clearTimeout(timerPreInstall.current);
      clearTimeout(timerInstall.current);
    };
  }, []);


  const handlePreInstall = () => {
    if (!loadingPreInstall) {
      setSuccessPreInstall(false);
      setLoadingPreInstall(true);
      timerPreInstall.current = window.setTimeout(() => {
        setSuccessPreInstall(true);
        setLoadingPreInstall(false);
      }, 2000);
    }
  };
  const handleInstall = () => {
    if (!loadingInstall) {
      setSuccessInstall(false);
      setLoadingInstall(true);
      timerInstall.current = window.setTimeout(() => {
        setSuccessInstall(true);
        setLoadingInstall(false);
      }, 2000);
    }
  };
  const handlePostInstall = () => {
    if (!loadingPostInstall) {
      setSuccessPostInstall(false);
      setLoadingPostInstall(true);
      timerPostInstall.current = window.setTimeout(() => {
        setSuccessPostInstall(true);
        setLoadingPostInstall(false);
      }, 2000);
    }
  };

  return (
    <Grid item container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h1" align='center'>
          Installing
        </Typography>
      </Grid>
      <ContentGrid item container>
        <Grid item container>
          <Grid item xs={2}></Grid>
          <Grid item container justifyContent="center" alignItems="center" xs={3}>
            <Box sx={{ m: 1, position: 'relative' }}>
            <Fab
                aria-label="save"
                color="primary"
                sx={buttonPreInstallSx}
                onClick={handlePreInstall}
              >
                {successPreInstall ? <DoneOutline /> : <DownloadingOutlined />}
              </Fab>
              {loadingPreInstall && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              )}
              </Box>
          </Grid>
          <Grid item container justifyContent="flex-start" alignItems="center" xs={4}>
                  <span>Downloading dependencies</span>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={2}></Grid>
          <Grid item container justifyContent="center" alignItems="center" xs={3}>
            <Box sx={{ m: 1, position: 'relative' }}>
            <Fab
                aria-label="save"
                color="primary"
                sx={buttonInstallSx}
                onClick={handleInstall}
              >
                {successInstall ? <DoneOutline /> : <ComputerOutlined />}
              </Fab>
              {loadingInstall && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              )}
              </Box>
          </Grid>
          <Grid item container justifyContent="flex-start" alignItems="center" xs={4}>
                  <span>Installing services</span>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={2}></Grid>
          <Grid item container justifyContent="center" alignItems="center" xs={3}>
            <Box sx={{ m: 1, position: 'relative' }}>
            <Fab
                aria-label="save"
                color="primary"
                sx={buttonPostInstallSx}
                onClick={handlePostInstall}
              >
                {successPostInstall ? <DoneOutline /> : <RocketLaunchOutlined />}
              </Fab>
              {loadingPostInstall && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              )}
              </Box>
          </Grid>
          <Grid item container justifyContent="flex-start" alignItems="center" xs={4}>
                  <span>Configuring and launching</span>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </ContentGrid>
      {/* props.children is the stepper */}
      {props.children}
      <StepNavigation
        onPrev={props.onStepBack}
        onNext={props.onStepForward}
        backLabel={"Back"}
        nextLabel={"Finish"}
        disableBack={false}
        disableNext={false}
      />
    </Grid>
  );
}

export default Install;
