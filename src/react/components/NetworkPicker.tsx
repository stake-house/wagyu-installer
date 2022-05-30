import { BackgroundLight, } from '../colors';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { Network } from '../types';
import styled from '@emotion/styled';
import { InstallDetails } from '../../electron/IMultiClientInstaller';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 350px;
  border-radius: 20px;
  background: ${BackgroundLight};
`;

const Submit = styled(Button)`
  margin: 8px auto 0;
  text-align: center;
  display: flex;
`;

type NetworkPickerProps = {
  handleCloseNetworkModal: (event: object, reason: string) => void,
  setInstallationDetails: Dispatch<SetStateAction<InstallDetails>>,
  installationDetails: InstallDetails,
}

/**
 * This is the network picker modal component where the user selects the desired network.
 * 
 * @param props.handleCloseNetworkModal function to handle closing the network modal
 * @param props.setInstallationDetails the currently set installation details
 * @param props.installationDetails the current installation details
 * @returns the network picker element to render
 */
export const NetworkPicker = (props: NetworkPickerProps) => {

  const closePicker = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    props.handleCloseNetworkModal({}, 'submitClick');
  }

  const networkChanged = (selected: React.ChangeEvent<HTMLInputElement>) => {

    let network = selected.target.value as Network
    let details = { ...props.installationDetails, network }

    props.setInstallationDetails(details);
  }

  return (
    <Container>
      <Typography id="modal-modal-title" align='center' variant="h4" component="h2">
            Network
      </Typography>
      <hr style={{ borderColor: 'orange' }} />
      <form onSubmit={closePicker}>
        <FormControl fullWidth focused style={{padding: '16px'}}>
          <RadioGroup aria-label="network" name="network" value={props.installationDetails.network} onChange={networkChanged}>
            <FormControlLabel sx={{ my: 1  }} value={Network.PRATER} control={<Radio />} label={Network.PRATER} />
            <FormControlLabel sx={{ my: 1  }} value={Network.MAINNET} control={<Radio />} label={Network.MAINNET} />
          </RadioGroup>
        </FormControl>
        <Submit variant="contained" color="primary" type="submit" tabIndex={1}>OK</Submit>
      </form>
    </Container>
  )
}