import { yupResolver } from "@hookform/resolvers";
import { Button, Dialog, DialogActions, DialogTitle, Fab, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add, Info, Security } from "@material-ui/icons";
import Rol from "models/Rol";
import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import FormSelect from "shared/components/FormSelect";
import ModalContent from "shared/components/ModalContent";
import * as yup from "yup";

const CreateUser: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, errors, register, control } = useForm<UserForm>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const roles = Rol.mockData();
  const classes = useStyles();
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const onSubmit = (data: UserForm) => console.log(data);

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={openDialog}>
        <Add className={classes.extendedIcon} />
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
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <ModalContent className={classes.content}>
            <FormIconTitle Icon={Info} title="Datos del usuario" />
            <FormField
              name="name"
              label="Nombre"
              inputRef={register}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : undefined}
            />
            <FormField
              name="surname"
              label="Apellido"
              inputRef={register}
              error={!!errors.surname}
              helperText={errors.surname ? errors.surname.message : undefined}
            />
            <FormField
              name="email"
              label="Email"
              type="email"
              inputRef={register}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : undefined}
            />

            <br />
            <br />


            <FormIconTitle Icon={Security} title="Asignar rol" />

            <Controller
              name="rolName"
              control={control}
              defaultValue=""
              as={
                <FormSelect
                  noneText="Sin seleccionar"
                  label="Elegir rol"
                  helperText={errors.rolName ? errors.rolName.message : undefined}
                  error={!!errors.rolName}
                >
                  {roles.map((rol) => (
                    <MenuItem key={rol.id} value={rol.name}>
                      {rol.name}
                    </MenuItem>
                  ))}
                </FormSelect>
              }
            />
          </ModalContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
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
  content: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
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

const schema = yup.object().shape({
  name: yup.string().required("Debe ingresar un nombre para el usuario"),
  surname: yup.string().required("Debe ingresar un apellido para el usuario"),
  rolName: yup.string().required("Debe ingresar un nombre para el usuario"),
  email: yup
    .string()
    .required("Debe ingresar un email para el usuario")
    .email("Debe ingresar un correo válido. Ej: usuario@email.com"),
});

type UserForm = yup.Asserts<typeof schema>;

export default CreateUser;

