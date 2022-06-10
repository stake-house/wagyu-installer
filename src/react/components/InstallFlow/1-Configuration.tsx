import React, { ChangeEvent, Dispatch, FC, ReactElement, SetStateAction, useState } from 'react';
import { Grid, Typography, FormControl, Select, MenuItem, SelectChangeEvent, Modal, Box, Button, TextField, InputAdornment } from '@mui/material';
import { Folder, Link } from '@mui/icons-material'
import StepNavigation from '../StepNavigation';
import styled from '@emotion/styled';
import { ConsensusClients, ExecutionClients, IConsensusClient, IExecutionClient } from '../../constants'
import { ConsensusClient, ExecutionClient, InstallDetails } from '../../../electron/IMultiClientInstaller';
import { BackgroundLight, } from '../../colors';

type ConfigurationProps = {
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


const ModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  padding: '20px',
  borderRadius: '20px',
  background: BackgroundLight,
  boxShadow: 24,
  p: 4,
};

/**
 * This page is the second step of the install process where the user inputs their configuration.
 * 
 * @param props the data and functions passed in, they are self documenting
 * @returns 
 */
const Configuration: FC<ConfigurationProps> = (props): ReactElement => {
  const [consensusClient, setConsensusClient] = useState<ConsensusClient>(props.installationDetails.consensusClient);
  const [executionClient, setExecutionClient] = useState<ExecutionClient>(props.installationDetails.executionClient);
  const [isModalOpen, setModalOpen] = useState(false)
  const [checkpointSync, setCheckpointSync] = useState('');
  const [executionClientFallback, setExecutionClientFallback] = useState('');
  const [installationPath, setInstallationPath] = useState('');

  const handleConsensusClientChange = (ev: SelectChangeEvent<string>) => {
    setConsensusClient(ev.target.value as ConsensusClient)
  }

  const handleExecutionClientChange = (ev: SelectChangeEvent<string>) => {
    setExecutionClient(ev.target.value as ExecutionClient)
  }

  const handleCheckpointSyncChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setCheckpointSync(ev.target.value)
  }
  const handleExecutionClientFallbackChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setExecutionClientFallback(ev.target.value)
  }
  const handleInstallationPathChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setInstallationPath(ev.target.value)
  }

  return (
    <Grid item container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h1" align='center'>
          Configuration
        </Typography>
      </Grid>
      <ContentGrid item container justifyContent={'center'}>
        <Grid xs={11} style={{ border: '1px solid orange' }} item container justifyContent={'center'} direction={'column'}>
          <Grid item container alignItems={'center'} p={2} spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <span>Consensus Client</span>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <FormControl sx={{ my: 2, minWidth: '215' }}>
                <Select
                  id="consensus-client"
                  value={consensusClient}
                  onChange={handleConsensusClientChange}
                >
                  {ConsensusClients.map((c: IConsensusClient) => {
                    return (
                      <MenuItem key={c.key} value={c.key}>{c.label}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
          <Grid item container alignItems={'center'} p={2} spacing={2}>
          <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <span>Execution Client</span>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <FormControl sx={{ my: 2, minWidth: '215' }}>
                <Select
                  id="execution-client"
                  value={executionClient}
                  onChange={handleExecutionClientChange}
                >
                  {ExecutionClients.map((c: IExecutionClient) => {
                    return (
                      <MenuItem key={c.key} value={c.key}>{c.label}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Grid>
        <Button disabled onClick={() => setModalOpen(true)}>Advanced Options</Button>
        <Modal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <Typography id="modal-modal-title" align='center' variant="h4" component="h2">
              Advanced options
            </Typography>
            <hr style={{ borderColor: 'orange' }} />
            <Grid container>
              <Grid xs={12} item container justifyContent={'flex-start'} direction={'column'}>
                <Grid item container alignItems={'center'} p={2} spacing={2}>
                  <Grid item xs={6}>
                    <span>Checkpoint Sync</span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      placeholder="https://beaconcha.in/checkpoint"
                      type={'url'}
                      sx={{ my: 2, minWidth: '215' }}
                      variant="outlined"
                      value={checkpointSync}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Link /></InputAdornment>,
                      }}
                      onChange={handleCheckpointSyncChange}
                    />
                  </Grid>
                </Grid>
                <Grid item container alignItems={'center'} p={2} spacing={2}>
                  <Grid item xs={6}>
                    <span>Execution Client Fallback</span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      placeholder="http://localhost:8545"
                      type={'url'}
                      sx={{ my: 2, minWidth: '215' }}
                      // label="Fallback URL" 
                      variant="outlined"
                      value={executionClientFallback}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Link /></InputAdornment>,
                      }}
                      onChange={handleExecutionClientFallbackChange}
                    />
                  </Grid>
                </Grid>
                <Grid item container alignItems={'center'} p={2} spacing={2}>
                  <Grid item xs={6}>
                    <span>Installation Path</span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      placeholder='.wagyu/'
                      onClick={(ev) => { ev.preventDefault(); }}
                      sx={{ my: 2, minWidth: '215' }}
                      variant="outlined"
                      disabled
                      value={installationPath}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Folder /></InputAdornment>,
                      }}
                      onChange={handleInstallationPathChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </ContentGrid>
      {props.children}
      <StepNavigation
        onPrev={props.onStepBack}
        onNext={() => {

          let installationDetails: InstallDetails = {
            consensusClient,
            executionClient,
            network: props.installationDetails.network
          }

          props.setInstallationDetails(installationDetails)

          props.onStepForward()
        }}
        backLabel={"Back"}
        nextLabel={"Install"}
        disableBack={false}
        disableNext={false}
      />
    </Grid>
  );
}

export default Configuration;
