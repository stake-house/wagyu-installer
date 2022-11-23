import { BackgroundLight } from "../../colors";
import { Typography, Box, Grid, Modal, IconButton, Tooltip } from "@mui/material";
import React, { FC, Dispatch, ReactElement, SetStateAction } from "react";
import { FormatPubkey } from "../../../utility";
import { HighlightOff } from "@mui/icons-material";

const ModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  padding: "20px",
  borderRadius: "20px",
  background: BackgroundLight,
  boxShadow: 24,
  p: 4,
};

type ManageValidatorsProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  validators: Array<string>;
};

const handleDeleteValidator = () => {};

const renderValidators: (v: Array<string>) => JSX.Element[] = (
  validators: Array<string>,
): JSX.Element[] => {
  let rows = [];
  for (let i = 0; i < validators.length; i++) {
    rows.push(
      <Grid key={validators[i]} container paddingX={1} paddingY={2} alignItems="center">
        <Grid xs={4} item>
          {FormatPubkey(validators[i])}
        </Grid>
        <Grid xs={4} item>
          Running
        </Grid>
        <Grid xs={4} item container justifyContent="flex-end">
          <Grid item>
            <Tooltip title="Delete Validator">
              <IconButton color="error" onClick={handleDeleteValidator} tabIndex={1}>
                <HighlightOff />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>,
    );
  }
  return rows;
};
/**
 * This is the network picker modal component where the user selects the desired network.
 *
 * @param props.isModalOpen the current open state of the modal
 * @param props.setModalOpen a function to set the modal open state
 * @param props.validators is an array of validator public keys that are imported
 * @returns the import validator key modal
 */
export const ManageValidators: FC<ManageValidatorsProps> = (props): ReactElement => {
  return (
    <Modal
      open={props.isModalOpen}
      onClose={() => props.setModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={ModalStyle}>
        <Typography id="modal-modal-title" align="center" variant="h4" component="h2">
          Manage Validators
        </Typography>
        <hr style={{ borderColor: "orange" }} />
        <Grid container paddingX={1} alignItems="center">
          <Grid xs={4} item>
            <Typography marginY={1} align="left" variant="h3" component="h2">
              Pubkey
            </Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography marginY={1} align="left" variant="h3" component="h2">
              Status
            </Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography marginY={1} align="right" variant="h3" component="h2">
              {/* Action */}
            </Typography>
          </Grid>
        </Grid>

        {renderValidators(props.validators)}
      </Box>
    </Modal>
  );
};
