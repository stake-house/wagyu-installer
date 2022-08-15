import React, { FC, ReactElement, useState, useRef, useMemo } from 'react';
import { Grid, Typography, Button, IconButton, Tooltip, Alert, Snackbar, AlertColor } from '@mui/material';
import styled from '@emotion/styled';
import VersionFooter from '../components/VersionFooter';
import { InstallDetails } from '../../electron/IMultiClientInstaller';
import { Capitalize } from '../../utility';
import { Settings, Add, Stop, PlayArrow, Notifications, Upgrade } from '@mui/icons-material';
import { ImportKeystore } from '../components/ImportKeystore';

const MainGrid = styled(Grid)`
  width: inherit;
  height: inherit;
  margin: 0px;
  text-align: center;
`;

const Card = styled(Grid)`
  background: rgba(0, 94, 86, 0.2);
  border: 1px solid rgba(255, 166, 0, 0.3);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const HorizontalLine = styled('div')`
  position: absolute;
  top: 25%;
  bottom: 25%;
  border-left: 1px solid rgba(255, 166, 0, 0.3);
  left: calc(50%);
`;

type SystemOverviewProps = {
  installationDetails: InstallDetails;
};

export type NodeState = 'syncing' | 'installing' | 'synced' | 'waiting' | 'stopped' | 'stopping' | 'starting';

const SystemOverview: FC<SystemOverviewProps> = (props): ReactElement => {
  const [statusConsensusNode, setStatusConsensusNode] = useState<NodeState>('syncing');
  const [consensusUpdateAvailable, setConsensusUpdateAvailable] = useState<boolean>(true);
  const [peersConsensusNode, setPeersConsensusNode] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [syncTimeLeft, setSyncTimeLeft] = useState('1 hour');
  const [consensusVersion, setConsensusVersion] = useState('2.1');

  const UpdateConsensusNodeIcon = () =>
    useMemo(() => {
      if (consensusUpdateAvailable) {
        return (
          <Tooltip title="Upgrade Consensus Node">
            <IconButton color="primary" onClick={handleConsensusNodeUpdate} tabIndex={1}>
              <Upgrade />
            </IconButton>
          </Tooltip>
        );
      } else {
        return (
          <IconButton disabled color="primary" tabIndex={1}>
            <Upgrade />
          </IconButton>
        );
      }
    }, [consensusUpdateAvailable]);

  const handleConsensusNodeUpdate = () => {
    setStatusConsensusNode('installing');
    setConsensusUpdateAvailable(false);
    setTimeout(() => {
      setStatusConsensusNode('starting');
      setTimeout(() => {
        setStatusConsensusNode('synced');
      }, 3000);
    }, 3000);
  };

  const StartStopConsensusNodeIcon = () =>
    useMemo(() => {
      switch (statusConsensusNode) {
        case 'syncing':
          return (
            <Tooltip title="Stop Consensus Node">
              <IconButton color="primary" onClick={toggleRunningStateConsensus} tabIndex={1}>
                <Stop />
              </IconButton>
            </Tooltip>
          );
        case 'installing':
          return (
            <IconButton disabled color="primary" tabIndex={1}>
              <Stop />
            </IconButton>
          );
        case 'stopping':
          return (
            <IconButton disabled color="primary" tabIndex={1}>
              <PlayArrow />
            </IconButton>
          );
        case 'stopped':
          return (
            <Tooltip title="Start Consensus Node">
              <IconButton color="primary" onClick={toggleRunningStateConsensus} tabIndex={1}>
                <PlayArrow />
              </IconButton>
            </Tooltip>
          );
        case 'starting':
          return (
            <IconButton disabled color="primary" tabIndex={1}>
              <Stop />
            </IconButton>
          );
        case 'waiting':
          return (
            <Tooltip title="Stop Consensus Node">
              <IconButton color="primary" onClick={toggleRunningStateConsensus} tabIndex={1}>
                <Stop />
              </IconButton>
            </Tooltip>
          );
        case 'synced':
          return (
            <Tooltip title="Stop Consensus Node">
              <IconButton color="primary" onClick={toggleRunningStateConsensus} tabIndex={1}>
                <Stop />
              </IconButton>
            </Tooltip>
          );
      }
    }, [statusConsensusNode]);

  const toggleRunningStateConsensus = () => {
    if (statusConsensusNode === 'stopped') {
      setStatusConsensusNode('starting');
      setTimeout(() => {
        setStatusConsensusNode('synced');
      }, 3000);
    } else {
      setStatusConsensusNode('stopping');
      setTimeout(() => {
        setStatusConsensusNode('stopped');
      }, 3000);
    }
  };

  const [statusValidator, setStatusValidator] = useState<NodeState>('waiting');
  const [validatorVersion, setValidatorVersion] = useState('2.1');

  const StartStopValidatorClientIcon = () =>
    useMemo(() => {
      switch (statusValidator) {
        case 'syncing':
          return (
            <Tooltip title="Stop Validator Client">
              <IconButton color="primary" onClick={toggleRunningStateValidator} tabIndex={1}>
                <Stop />
              </IconButton>
            </Tooltip>
          );
        case 'installing':
          return (
            <IconButton disabled color="primary" onClick={toggleRunningStateValidator} tabIndex={1}>
              <Stop />
            </IconButton>
          );
        case 'stopping':
          return (
            <IconButton disabled color="primary" onClick={toggleRunningStateValidator} tabIndex={1}>
              <PlayArrow />
            </IconButton>
          );
        case 'stopped':
          return (
            <Tooltip title="Start Validator Client">
              <IconButton color="primary" onClick={toggleRunningStateValidator} tabIndex={1}>
                <PlayArrow />
              </IconButton>
            </Tooltip>
          );
        case 'starting':
          return (
            <IconButton disabled color="primary" onClick={toggleRunningStateValidator} tabIndex={1}>
              <Stop />
            </IconButton>
          );
        case 'waiting':
          return (
            <Tooltip title="Stop Validator Client">
              <IconButton color="primary" onClick={toggleRunningStateValidator} tabIndex={1}>
                <Stop />
              </IconButton>
            </Tooltip>
          );
        case 'synced':
          return (
            <Tooltip title="Stop Validator client">
              <IconButton color="primary" onClick={toggleRunningStateValidator} tabIndex={1}>
                <Stop />
              </IconButton>
            </Tooltip>
          );
      }
    }, [statusValidator]);

  const toggleRunningStateValidator = () => {
    if (statusValidator === 'stopped') {
      setStatusValidator('starting');
      setTimeout(() => {
        setStatusValidator('synced');
      }, 3000);
    } else {
      setStatusValidator('stopping');
      setTimeout(() => {
        setStatusValidator('stopped');
      }, 3000);
    }
  };

  const [statusExecutionNode, setStatusExecutionNode] = useState<NodeState>('syncing');
  const [peersExecutionNode, setPeersExecutionNode] = useState(0);
  const [executionVersion, setExecutionVersion] = useState('2.1');
  const [executionUpdateAvailable, setExecutionUpdateAvailable] = useState<boolean>(true);

  const UpdateExecutionNodeIcon = () =>
    useMemo(() => {
      if (executionUpdateAvailable) {
        return (
          <Tooltip title="Upgrade Consensus Node">
            <IconButton color="primary" onClick={handleExecutionNodeUpdate} tabIndex={1}>
              <Upgrade />
            </IconButton>
          </Tooltip>
        );
      } else {
        return (
          <IconButton disabled color="primary" tabIndex={1}>
            <Upgrade />
          </IconButton>
        );
      }
    }, [executionUpdateAvailable]);

  const handleExecutionNodeUpdate = () => {
    setStatusExecutionNode('installing');
    setExecutionUpdateAvailable(false);
    setTimeout(() => {
      setStatusExecutionNode('starting');
      setTimeout(() => {
        setStatusExecutionNode('synced');
      }, 3000);
    }, 3000);
  };

  const StartStopExecutionClientIcon = () =>
    useMemo(() => {
      switch (statusExecutionNode) {
        case 'syncing':
          return (
            <Tooltip title="Stop Execution Node">
              <IconButton color="primary" onClick={toggleRunningStateExecutionNode} tabIndex={1}>
                <Stop />
              </IconButton>
            </Tooltip>
          );
        case 'installing':
          return (
            <IconButton disabled color="primary" onClick={toggleRunningStateExecutionNode} tabIndex={1}>
              <Stop />
            </IconButton>
          );
        case 'stopping':
          return (
            <IconButton disabled color="primary" onClick={toggleRunningStateExecutionNode} tabIndex={1}>
              <PlayArrow />
            </IconButton>
          );
        case 'stopped':
          return (
            <Tooltip title="Start Execution Node">
              <IconButton color="primary" onClick={toggleRunningStateExecutionNode} tabIndex={1}>
                <PlayArrow />
              </IconButton>
            </Tooltip>
          );
        case 'starting':
          return (
            <IconButton disabled color="primary" onClick={toggleRunningStateExecutionNode} tabIndex={1}>
              <Stop />
            </IconButton>
          );
        case 'waiting':
          return (
            <Tooltip title="Stop Execution Node">
              <IconButton color="primary" onClick={toggleRunningStateExecutionNode} tabIndex={1}>
                <Stop />
              </IconButton>
            </Tooltip>
          );
        case 'synced':
          return (
            <Tooltip title="Stop Execution Node">
              <IconButton color="primary" onClick={toggleRunningStateExecutionNode} tabIndex={1}>
                <Stop />
              </IconButton>
            </Tooltip>
          );
      }
    }, [statusExecutionNode]);

  const toggleRunningStateExecutionNode = () => {
    if (statusValidator === 'stopped') {
      setStatusExecutionNode('starting');
      setTimeout(() => {
        setStatusExecutionNode('synced');
      }, 3000);
    } else {
      setStatusExecutionNode('stopping');
      setTimeout(() => {
        setStatusExecutionNode('stopped');
      }, 3000);
    }
  };

  const [isImportKeyModalOpen, setImportKeyModalOpen] = useState<boolean>(false);
  const [keyStorePath, setKeystorePath] = useState<string>('');
  const [keystorePassword, setKeystorePassword] = useState<string>('');
  const resolveModal = useRef<(arg: () => Promise<boolean>) => void>();

  new Promise((resolve: (arg: () => Promise<boolean>) => void) => {
    resolveModal.current = resolve;
  })
    .then((keyImp: () => Promise<boolean>) => {
      keyImp()
        .then((key) => {
          console.log(key);
          if (key) {
            toggleAlert('Keystore import successful', 'success');
          } else {
            toggleAlert('Keystore import failed', 'error');
          }
        })
        .catch((err) => {
          toggleAlert('Keystore import failed', 'error');
          console.error('error key import modal rejected with', err);
        });
    })
    .catch((err) => {
      toggleAlert('Keystore import failed', 'error');
      console.error('error key import modal rejected with', err);
    });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('This is an error');
  const [alertSeverity, setAlertSeverity] = useState('success' as AlertColor);

  const toggleAlert = (message: string, severity: AlertColor) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <MainGrid container direction={'column'}>
      <Grid xs={1} item>
        <Typography variant="h1" align="center">
          Overview
        </Typography>
      </Grid>
      <Grid xs={11} container item>
        <Grid xs={6} paddingY={2} paddingX={1} container item direction={'column'}>
          <Grid xs={2} item container>
            <Grid container item justifyContent="space-between" alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h3" align="left">
                  {Capitalize(props.installationDetails.consensusClient)} Node
                  <span style={{ fontSize: '1rem', opacity: '0.8' }}> v{consensusVersion}</span>
                </Typography>
              </Grid>
              <Grid container item xs={6} justifyContent="flex-end">
                <Grid item>
                  <UpdateConsensusNodeIcon />
                </Grid>
                <Grid item>
                  <StartStopConsensusNodeIcon />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Card position="relative" xs={8} item container justifyContent="stretch">
            <HorizontalLine />
            <Grid xs={12} padding={2} container item alignItems="center">
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Status</Grid>
                <Grid item>
                  <span>{statusConsensusNode}</span>
                </Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Epoch</Grid>
                <Grid item>{currentEpoch}</Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Peers</Grid>
                <Grid item>{peersConsensusNode}</Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Remaining</Grid>
                <Grid item>{syncTimeLeft}</Grid>
              </Grid>
              {/* <Grid
                justifyContent="space-between"
                container
                xs={6}
                paddingY={1}
                paddingX={2}
                item
              >
                <Grid item>DB Path</Grid>
                <Grid item>/home/</Grid>
              </Grid> */}
              {/* <Grid
                justifyContent="space-between"
                container
                xs={6}
                paddingY={1}
                paddingX={2}
                item
              >
                <Grid item>Node</Grid>
                <Grid item>Local</Grid>
              </Grid> */}
            </Grid>
          </Card>
        </Grid>
        <Grid xs={6} paddingY={2} paddingX={1} container item direction={'column'}>
          <Grid xs={2} item container>
            <Grid container item justifyContent="space-between" alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h3" align="left">
                  Validator Client
                  <span style={{ fontSize: '1rem', opacity: '0.8' }}> v{validatorVersion}</span>
                </Typography>
              </Grid>
              <Grid xs={6} container item justifyContent="flex-end">
                <Grid item>
                  <Tooltip title="Add Validator">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setImportKeyModalOpen(true);
                      }}
                      tabIndex={1}
                    >
                      <Add />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <StartStopValidatorClientIcon />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Card position="relative" xs={8} item container justifyContent="stretch">
            <HorizontalLine />
            <Grid xs={12} padding={2} container item alignItems="center">
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Status</Grid>
                <Grid item>{statusValidator}</Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Remaining</Grid>
                <Grid item>1 hour</Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>DB Path</Grid>
                <Grid item>/home/</Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Node</Grid>
                <Grid item>Local</Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid xs={6} paddingY={2} paddingX={1} container item direction={'column'}>
          <Grid xs={2} item>
            <Grid container item justifyContent="space-between" alignItems="center">
              <Grid xs={6} item>
                <Typography variant="h3" align="left">
                  {Capitalize(props.installationDetails.executionClient)} Node
                  <span style={{ fontSize: '1rem', opacity: '0.8' }}> v{executionVersion}</span>
                </Typography>
              </Grid>
              <Grid container item xs={6} justifyContent="flex-end">
                <Grid item>
                  <UpdateExecutionNodeIcon />
                </Grid>
                <Grid item>
                  <StartStopExecutionClientIcon />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Card position="relative" xs={8} item container justifyContent="stretch">
            <HorizontalLine />
            <Grid xs={12} padding={2} container item alignItems="center">
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Status</Grid>
                <Grid item>{statusExecutionNode}</Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Remaining</Grid>
                <Grid item>1 hour</Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>DB Path</Grid>
                <Grid item>/home/</Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Peers</Grid>
                <Grid item>{peersExecutionNode}</Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid xs={6} paddingY={2} paddingX={1} container item direction={'column'}>
          <Grid xs={2} item>
            <Grid container item justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h3" align="left">
                  System
                </Typography>
              </Grid>
              <Grid container item xs={2} justifyContent="flex-end">
                <Grid item>
                  <Tooltip title="Configure alerts">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        window.open('https://beaconcha.in/user/notifications');
                      }}
                      tabIndex={1}
                    >
                      <Notifications />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Card position="relative" xs={8} item container justifyContent="stretch">
            <HorizontalLine />
            <Grid xs={12} padding={2} container item alignItems="center">
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Storage</Grid>
                <Grid item>600 GB</Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>RAM</Grid>
                <Grid item>3 GB</Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>Growth</Grid>
                <Grid item>10 GB/mo</Grid>
              </Grid>
              <Grid justifyContent="space-between" container xs={6} paddingY={1} paddingX={2} item>
                <Grid item>CPU</Grid>
                <Grid item>30%</Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <VersionFooter />
      <ImportKeystore
        setModalOpen={setImportKeyModalOpen}
        isModalOpen={isImportKeyModalOpen}
        setKeystorePassword={setKeystorePassword}
        setKeystorePath={setKeystorePath}
        keyStorePath={keyStorePath}
        keystorePassword={keystorePassword}
        closing={resolveModal}
        installationDetails={props.installationDetails}
      />

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </MainGrid>
  );
};

export default SystemOverview;

{
  /* <Grid item container>
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
</Grid> */
}
