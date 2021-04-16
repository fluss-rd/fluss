import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormField from "shared/components/FormField";
import ModalContent from "shared/components/ModalContent";

type PermissionForm = {
  name: string;
  description: string;
};

const CreatePermission: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, control, errors, formState } = useForm<PermissionForm>({
    mode: "onChange",
  });

  const classes = useStyles();
  const { isDirty, isValid } = formState;

  const handleClickOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const onSubmit = (data: PermissionForm) => console.log(data);

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={handleClickOpen}>
        <Add className={classes.extendedIcon} />
        Agregar permiso
      </Fab>
      <Dialog
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar permiso</DialogTitle>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <ModalContent className={classes.content}>
            <DialogContentText>
              Indique el nombre y descripción del nuevo permiso.
            </DialogContentText>

            <Controller
              name="name"
              control={control}
              defaultValue=""
              as={
                <FormField
                  label="Nombre"
                  placeholder="Nombre del rol"
                  helperText={errors.name ? errors.name.message : null}
                  error={errors.name ? true : false}
                />
              }
              rules={{
                required: { value: true, message: "Ingrese un nombre para el permiso" },
                minLength: { value: 1, message: "Ingrese un nombre para el permiso" },
                maxLength: {
                  value: 70,
                  message: "El nombre debe tener como máximo 70 caracteres",
                },
              }}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              as={
                <FormField
                  multiline
                  rows={5}
                  label="Descripción"
                  placeholder="Descripción del permiso"
                  helperText={errors.description ? errors.description.message : null}
                  error={errors.description ? true : false}
                />
              }
              rules={{
                required: { value: true, message: "Debe ingresar la descripción para el permiso" },
                minLength: { value: 1, message: "Debe ingresar la descripción para el permiso" },
                maxLength: {
                  value: 250,
                  message: "Solo se permite un máximo de 250 caracteres para la descripción",
                },
              }}
            />
          </ModalContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button color="primary" type="submit" disabled={!isDirty || !isValid}>
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
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  content: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default CreatePermission;
