import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useRef, useEffect, MouseEventHandler } from 'react';
import { Grid, Typography, Fab, CircularProgress, Box, InputAdornment, Link, Modal, TextField } from '@mui/material';
import StepNavigation from '../StepNavigation';
import { DoneOutline, DownloadingOutlined, ComputerOutlined, RocketLaunchOutlined, Folder  } from '@mui/icons-material';
import styled from '@emotion/styled';

import { green } from '@mui/material/colors';
import { InstallDetails } from '../../../electron/IMultiClientInstaller';
import { BackgroundLight } from '../../colors';
import { ImportKeystore } from '../ImportKeystore'

type InstallProps = {
  onStepBack: () => void,
  onStepForward: () => void,
  installationDetails: InstallDetails,
  setInstallationDetails: Dispatch<SetStateAction<InstallDetails>>
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

  const [loadingPreInstall, setLoadingPreInstall] = useState(false);
  const [loadingInstall, setLoadingInstall] = useState(false);
  const [loadingPostInstall, setLoadingPostInstall] = useState(false);
  const [successPreInstall, setSuccessPreInstall] = useState(false);
  const [successInstall, setSuccessInstall] = useState(false);
  const [successPostInstall, setSuccessPostInstall] = useState(false);
  // const timerPreInstall = useRef<number>();
  // const timerInstall = useRef<number>();
  // const timerPostInstall = useRef<number>();
  // const timerWaitBeforeStart = useRef<number>();

  const [disableBack, setDisableBack] = useState<boolean>(true)
  const [disableForward, setDisableForward] = useState<boolean>(true)

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

  const ModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  padding: '20px',
  borderRadius: '20px',
  background: BackgroundLight,
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const [isModalOpen, setModalOpen] = useState<boolean>(false)
const [keyStorePath, setKeystorePath] = useState<string>('')
const [keystorePassword, setKeystorePassword] = useState<string>('')
const [resolveModal, setResolveModal] = useState<() => void>(() => {})

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(timerPostInstall.current);
  //     clearTimeout(timerPreInstall.current);
  //     clearTimeout(timerInstall.current);
  //     clearTimeout(timerWaitBeforeStart.current)
  //   };
  // }, []);


  const handlePreInstall: () => Promise<boolean> = () => {
    return new Promise((resolve) => {
      if (!loadingPreInstall) {
        setSuccessPreInstall(false);
        setLoadingPreInstall(true);
        
        window.ethDocker.preInstall()
        .then((preInstallResult) => {
          setSuccessPreInstall(true);
          setLoadingPreInstall(false);
          resolve(preInstallResult)
        }).catch(err => {
          console.error('preinstall failed', err)
        })
      }
    })
  };

  const handleInstall: () => Promise<boolean> = () => {
    return new Promise((resolve) => {
      if (!loadingInstall) {
        setSuccessInstall(false);
        setLoadingInstall(true);

        window.ethDocker.install(props.installationDetails)
        .then(res => {
          setSuccessInstall(true);
          setLoadingInstall(false);
          resolve(res)
        })
      }
    })
  };

  const handleKeyImportModal: () => Promise<boolean> = () => {
    return new Promise((resolve) => {
      setModalOpen(true)
      setResolveModal(() => resolve(null))
    }).then(() => {
      return new Promise((resolve) => {
        window.ethDocker.importKeys(props.installationDetails.network, keyStorePath, keystorePassword)
        .then((importKeyResult) => {
          resolve(importKeyResult)
        })
      })
    })
  }

  const handlePostInstall: () => Promise<boolean> = () => {
    return new Promise((resolve) => {
      if (!loadingPostInstall) {
        setSuccessPostInstall(false);
        setLoadingPostInstall(true);

        window.ethDocker.postInstall(props.installationDetails.network)
        .then((res) => {
            resolve(res)
          }
        )
      }
    })
  };

  const install = async () => {
    console.log('pre install')
    let preInstallResult = await handlePreInstall()
    console.log('preinstall result', preInstallResult)
    if (!preInstallResult) {
      props.onStepBack()
      return
    }
    console.log('install')
    let installResult = await handleInstall()
    console.log('install result', preInstallResult)
    if (!installResult) {
      props.onStepBack()
      return
    }
    console.log('key import')
    let keyImportResult = await handleKeyImportModal()
    console.log('key import', keyImportResult)
    if (!keyImportResult) {
      props.onStepBack()
      return
    }
    console.log('post install')
    let postInstallResult = await handlePostInstall()
    console.log('post install result', preInstallResult)
    if (!postInstallResult) {
      props.onStepBack()
      return
    }
    setDisableForward(false)
  }

  useEffect(() => {
    install()
  }, [])



  return (
    <Grid item container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h1" align='center'>
          Installing 
        </Typography>
      </Grid>
      <ContentGrid item container>
        <Grid item container>
          <Grid item xs={3}></Grid>
          <Grid item container justifyContent="center" alignItems="center" xs={2}>
            <Box sx={{ m: 1, position: 'relative' }}>
            <Fab
                aria-label="save"
                color="primary"
                sx={buttonPreInstallSx}
                disabled
              >
                {successPreInstall ? <DoneOutline sx={{
                  color: green[500],
                }}/> : <DownloadingOutlined />}
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
          <Grid item xs={1}></Grid>
          <Grid item container justifyContent="flex-start" alignItems="center" xs={3}>
                  <span>Downloading dependencies</span>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={3}></Grid>
          <Grid item container justifyContent="center" alignItems="center" xs={2}>
            <Box sx={{ m: 1, position: 'relative' }}>
            <Fab
                aria-label="save"
                color="primary"
                sx={buttonInstallSx}
                disabled
              >
                {successInstall ? <DoneOutline sx={{
                  color: green[500],
                }} /> : <ComputerOutlined />}
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
          <Grid item xs={1}></Grid>
          <Grid item container justifyContent="flex-start" alignItems="center" xs={4}>
                  <span>Installing services</span>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={3}></Grid>
          <Grid item container justifyContent="center" alignItems="center" xs={2}>
            <Box sx={{ m: 1, position: 'relative' }}>
            <Fab
                aria-label="save"
                color="primary"
                sx={buttonPostInstallSx}
                disabled
              >
                {successPostInstall ? 
                <DoneOutline sx={{
                  color: green[500],
                }} /> : <RocketLaunchOutlined />}
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
          <Grid item xs={1}></Grid>
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
        disableBack={disableBack}
        disableNext={disableForward}
      />
      <ImportKeystore
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        setKeystorePassword={setKeystorePassword}
        setKeystorePath={setKeystorePath}
        keyStorePath={keyStorePath}
        keystorePassword={keystorePassword}
        resolve={resolveModal}
      />
    </Grid>
  );
}

export default Install;
