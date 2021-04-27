import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import useModal from "hooks/useModal";
import RegisterModuleForm from "models/RegisterModuleForm";
import React, { FC } from "react";
import ModalContent from "shared/components/ModalContent";

import ModuleForm from "../ModuleForm";
import useModuleForm from "../ModuleForm/useModuleForm";

interface OpenFormButtonProps {}

const RegisterModule: FC<OpenFormButtonProps> = () => {
  const { isOpen, closeModal, openModal } = useModal();
  const classes = useStyles();
  const logic = useModuleForm(isOpen);

  function onSubmit(form: RegisterModuleForm) {
    console.log(form);
  }

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={openModal}>
        <Add className={classes.extendedIcon} />
        Registrar módulo
      </Fab>
      <Dialog
        fullWidth
        open={isOpen}
        maxWidth="md"
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <form noValidate autoComplete="off" onSubmit={logic.form.handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Registrar módulo</DialogTitle>
          <ModalContent>
            <DialogContentText>
              Llene el siguiente formulario pare efectuar el registro. Asegúrese de colocar los
              datos correctos del dispositivo para que la conexión pueda establecerse con éxito.
            </DialogContentText>
            <Grid container spacing={3}>
              <ModuleForm moduleForm={logic} />
            </Grid>
          </ModalContent>
          <DialogActions>
            <Button onClick={closeModal} color="primary">
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

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    paddingLeft: theme.spacing(3.2),
    paddingRight: theme.spacing(3.2),
    paddingBottom: theme.spacing(3.2),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default RegisterModule;
