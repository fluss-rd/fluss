import { Button, Dialog, DialogActions, DialogTitle, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import useBoolean from "hooks/useBoolean";
import React, { FC } from "react";
import { useRef } from "react";
import ModalContent from "shared/components/ModalContent";

import UserForm, { UserFormModel, UserFormRef } from "./UserForm";

const CreateUser: FC = () => {
  const [isOpen, openDialog, closeDialog] = useBoolean();
  const userFormRef = useRef<UserFormRef>();
  const classes = useStyles();

  const onSubmit = (data: UserFormModel) => console.log({ data });

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={openDialog}>
        <Add />
        Registrar usuario
      </Fab>
      <Dialog
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Registrar usuario</DialogTitle>
        <ModalContent spacing={2} dividers>
          <UserForm ref={userFormRef} />
        </ModalContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={() => userFormRef.current.form.handleSubmit(onSubmit)()}>
            Registrar
          </Button>
        </DialogActions>
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

export default CreateUser;

