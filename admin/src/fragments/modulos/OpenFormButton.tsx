import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import React, { FC, useState } from "react";

import RegisterModule from "./RegisterModule";

interface OpenFormButtonProps {}

const OpenFormButton: FC<OpenFormButtonProps> = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={handleClickOpen}>
        <Add className={classes.extendedIcon} />
        Registrar módulo
      </Fab>
      <Dialog
        fullWidth
        open={isOpen}
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Registrar módulo</DialogTitle>
        <DialogContent>
          <RegisterModule />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default OpenFormButton;
