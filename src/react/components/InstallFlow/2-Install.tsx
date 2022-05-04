import React, { FC, ReactElement, useState } from 'react';
import { Grid, Typography, FormControl, Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';
import StepNavigation from '../StepNavigation';
import styled from '@emotion/styled';
import { ConsensusClients, ExecutionClients, IConsensusClient, IExecutionClient } from '../../constants'
import { ConsensusClient } from '../../../electron/IMultiClientInstaller';

type InstallProps = {
  onStepBack: () => void,
  onStepForward: () => void,
}

const ContentGrid = styled(Grid)`
  height: 320px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

// const InputGroup = styled(Grid)`
//   margin: 1rem 0;
//   border: 1px solid orange;
// `

// const ExecutionSelector = styled(Grid)`

// `

// const ConsensusSelector = styled(Grid)`

// `



/**
 * This page is the third step of the install process where the software is being installed.
 * 
 * @param props the data and functions passed in, they are self documenting
 * @returns 
 */
const Install: FC<InstallProps> = (props): ReactElement => {

  const [consensusClient, setConsensusClient] = useState('prysm');
  const [executionClient, setExecutionClient] = useState('geth');

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
          Installing
        </Typography>
      </Grid>
      <ContentGrid item container justifyContent={'center'}>
        <Grid xs={11} style={{ border: '1px solid orange' }} item container justifyContent={'center'} direction={'column'}>
          <Grid item container alignItems={'center'} p={2} spacing={2}>
            <Grid item xs={6}>
              <span style={{ marginLeft: '1rem' }}>Consensus Client</span>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ my: 2, minWidth: '205' }}>
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
              <FormControl sx={{ my: 2, minWidth: '205' }}>
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

export default Install;
