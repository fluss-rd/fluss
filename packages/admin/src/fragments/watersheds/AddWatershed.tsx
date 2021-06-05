import { Button, Dialog, DialogActions, DialogTitle, Fab, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import useBoolean from "hooks/use-boolean";
import React, { FC, useState } from "react";
import FormField from "shared/components/FormField";
import ModalContent from "shared/components/ModalContent";

interface AddWatershedProps {}

const AddWatershed: FC<AddWatershedProps> = (props) => {
  const [isOpen, open, close] = useBoolean();
  const classes = useStyles();

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={open}>
        <Add />
        Registrar cuenca
      </Fab>
      <Dialog
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Registrar cuerpo hídrico</DialogTitle>

        <br />

        <form noValidate autoComplete="off">
          <ModalContent spacing={3}>
            <FormField name="name" label="Nombre" />
            <FormField name="name" label="Nombre" />
          </ModalContent>
          <DialogActions>
            <Button onClick={close} color="primary">
              Cancelar
            </Button>
            <Button color="primary" type="submit">
              Registrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

export default AddWatershed;
