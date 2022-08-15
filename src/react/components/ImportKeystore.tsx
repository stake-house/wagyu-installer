import { BackgroundLight } from '../colors';
import {
  Button,
  Typography,
  Box,
  Grid,
  Modal,
  InputAdornment,
  TextField,
  styled,
  // useFormControl,
  TextFieldProps,
} from '@mui/material';
import React, {
  FC,
  ChangeEvent,
  Dispatch,
  ReactElement,
  SetStateAction,
  MutableRefObject,
  useMemo,
  useState,
} from 'react';

import { FileCopy, LockOpen } from '@mui/icons-material';
import { InstallDetails } from '../../electron/IMultiClientInstaller';

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

const FileUploadField = styled(TextField)({
  '& label.Mui-focused': {},
  '& .MuiInput-underline:after': {},
  '& .MuiOutlinedInput-root': {
    paddingLeft: '0',
    cursor: 'pointer',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:hover fieldset': {
      cursor: 'pointer',
    },
    '&.Mui-focused fieldset': {
      cursor: 'pointer',
    },
  },
});

type ImportKeystoreProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  keyStorePath: string;
  keystorePassword: string;
  setKeystorePath: Dispatch<SetStateAction<string>>;
  setKeystorePassword: Dispatch<SetStateAction<string>>;
  closing: MutableRefObject<((arg: () => Promise<boolean>) => void) | undefined>;
  installationDetails: InstallDetails;
};

/**
 * This is the network picker modal component where the user selects the desired network.
 *
 * @param props.isModalOpen the current open state of the modal
 * @param props.setModalOpen a function to set the modal open state
 * @param props.keyStorePath the path to the directory where the validator keys are stored
 * @param props.setKeystorePath set the path to the directory where the validator keys are stored
 * @param props.keystorePassword the password to unlock the validator key
 * @param props.setKeystorePassword sets the password used to unlock the validator keys
 * @param props.closing sets the function that will be called after the modal is closed
 * @param props.installationDetails the current installation details
 * @returns the import validator key modal
 */
export const ImportKeystore: FC<ImportKeystoreProps> = (props): ReactElement => {
  const handleKeystorePathChange = (ev: ChangeEvent<HTMLInputElement>) => {
    props.setKeystorePath(ev.target.value);
  };
  const handlePasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
    props.setKeystorePassword(ev.target.value);
  };

  const [errorUpload, setErrorUpload] = useState<boolean>(false);

  function MyFormHelperText() {
    // const { focused } = useFormControl() || {};
    const helperText = useMemo(() => {
      if (errorUpload) {
        return 'provide a directory path';
      } else {
        return '';
      }
    }, [errorUpload]);

    return <span>{helperText}</span>;
  }

  return (
    <Modal
      open={props.isModalOpen}
      onClose={() => props.setModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={ModalStyle}>
        <Typography id="modal-modal-title" align="center" variant="h4" component="h2">
          Import Validator Keys
        </Typography>
        <hr style={{ borderColor: 'orange' }} />
        <Grid container>
          <Grid xs={12} item container justifyContent={'flex-start'} direction={'column'}>
            <Grid item container alignItems={'center'} p={2} spacing={2}>
              <Grid item xs={6}>
                <span>Keystore Directory</span>
              </Grid>
              <Grid item xs={6}>
                <FileUploadField
                  helperText={<MyFormHelperText />}
                  placeholder="/validator_keys/"
                  error={errorUpload}
                  sx={{ my: 2, minWidth: '215', cursor: 'pointer !important' }}
                  variant="outlined"
                  onChange={handleKeystorePathChange}
                  value={props.keyStorePath}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        color="primary"
                        sx={{ paddingLeft: '14px' }}
                        onClick={(ev) => {
                          ev.preventDefault();
                          window.electronAPI
                            .invokeShowOpenDialog({
                              properties: ['openDirectory'],
                            })
                            .then((DialogResponse) => {
                              if (DialogResponse.filePaths && DialogResponse.filePaths.length) {
                                props.setKeystorePath(DialogResponse.filePaths[0]);
                              }
                            });
                        }}
                        position="start"
                      >
                        <FileCopy />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems={'center'} p={2} spacing={2}>
              <Grid item xs={6}>
                <span>Keystore Password</span>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type={'password'}
                  sx={{ my: 2, minWidth: '215' }}
                  // label="Fallback URL"
                  variant="outlined"
                  required
                  value={props.keystorePassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpen />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign="center" my={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (!props.keyStorePath || !props.setKeystorePath.length) {
                  setErrorUpload(true);
                  return;
                }
                setErrorUpload(false);
                props.setModalOpen(false);
                if (props.closing && props.closing.current) {
                  props.closing.current(() =>
                    window.ethDocker.importKeys(
                      props.installationDetails.network,
                      props.keyStorePath,
                      props.keystorePassword,
                    ),
                  );
                }
              }}
            >
              Import
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
