import React, { FC, ReactElement, useState } from 'react';
import { Grid, Typography, FormControl, Select, MenuItem, InputLabel, SelectChangeEvent, Modal, Box, Button, TextField, InputAdornment } from '@mui/material';
import { Folder, Link } from '@mui/icons-material'
import StepNavigation from '../StepNavigation';
import styled from '@emotion/styled';
import { ConsensusClients, ExecutionClients, IConsensusClient, IExecutionClient } from '../../constants'
import { ConsensusClient } from '../../../electron/IMultiClientInstaller';


type ConfigurationProps = {
  onStepBack: () => void,
  onStepForward: () => void,
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
  bgcolor: 'background.paper',
  border: '2px solid #000',
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
  const [consensusClient, setConsensusClient] = useState('prysm');
  const [executionClient, setExecutionClient] = useState('geth');
  const [isModalOpen, setModalOpen] = useState(false)

  const handleConsensusClientChange = (client: SelectChangeEvent<string>) => {
    setConsensusClient(client.target.value)
  }

  const handleExecutionClientChange = (client: SelectChangeEvent<string>) => {
    setExecutionClient(client.target.value)
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
            <Grid item xs={6}>
              <span style={{ marginLeft: '1rem' }}>Consensus Client</span>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ my: 2, minWidth: '215' }}>
                {/* <InputLabel id="consensus-client-label">Consensus Client</InputLabel> */}
                <Select
                  // labelId="consensus-client-label"
                  id="consensus-client"
                  value={consensusClient}
                  // label="Consensus Client"
                  onChange={handleConsensusClientChange}
                >
                  {ConsensusClients.map((c: IConsensusClient) => {
                    return (
                      <MenuItem value={c.key}>{c.label}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container alignItems={'center'} p={2} spacing={2}>
            <Grid item xs={6}>
              <span style={{ marginLeft: '1rem' }}>Execution Client</span>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ my: 2, minWidth: '215' }}>
                {/* <InputLabel id="execution-client-label">Execution Client</InputLabel> */}
                <Select
                  // labelId="execution-client-label"
                  id="execution-client"
                  value={executionClient}
                  // label="Execution Client"
                  onChange={handleExecutionClientChange}
                >
                  {ExecutionClients.map((c: IExecutionClient) => {
                    return (
                      <MenuItem value={c.key}>{c.label}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Button onClick={() => setModalOpen(true)}>Advanced Options</Button>
        <Modal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
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
                      type={'url'}
                      sx={{ my: 2, minWidth: '215' }}
                      // label="Checkpoint URL" 
                      variant="outlined"
                      disabled
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Link /></InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container alignItems={'center'} p={2} spacing={2}>
                  <Grid item xs={6}>
                    <span>Execution Client Fallback</span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type={'url'}
                      sx={{ my: 2, minWidth: '215' }}
                      // label="Fallback URL" 
                      variant="outlined"
                      disabled
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Link /></InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container alignItems={'center'} p={2} spacing={2}>
                  <Grid item xs={6}>
                    <span>Installation Path</span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      onClick={(ev) => { ev.preventDefault(); console.log('lols') }}
                      sx={{ my: 2, minWidth: '215' }}
                      variant="outlined"
                      disabled
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Folder /></InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
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
