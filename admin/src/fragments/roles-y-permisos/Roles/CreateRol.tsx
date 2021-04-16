import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  List,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add, AssignmentIndOutlined, ControlPoint, InfoOutlined } from "@material-ui/icons";
import Permission from "models/Permission";
import Rol from "models/Rol";
import RolPermission from "models/RolPermission";
import React, { FC, Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import ModalContent from "shared/components/ModalContent";

import RolPermissionItem, { ActionEvent, RemoveEvent } from "../RolPermissionItem";
import AssignPermissions from "./AssignPermissions";

type RolForm = {
  name: string;
  description: string;
};

interface CreateRolProps {}

const CreateRol: FC<CreateRolProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [added, setAdded] = useState<RolPermission[]>([]);

  const classes = useStyles();
  const { handleSubmit, control, errors, formState } = useForm<RolForm>({ mode: "onChange" });
  const { isDirty, isValid } = formState;

  const onSavePermissions = (permissions: Permission[]) => {
    const rolPermissions = permissions.map(
      (permission): RolPermission => ({
        id: "",
        permission,
        rol: {} as Rol,
        actions: RolPermission.allActions(),
      })
    );

    setAdded(rolPermissions);
  };

  const onSubmit = (data: RolForm) => console.log(data, added);

  const onAction = (e: ActionEvent) => {
    setAdded((prev) => {
      const modified = [...prev];
      const rolPermission = modified[e.index];
      const actionIndex = rolPermission.actions.findIndex((a) => a === e.action);
      if (actionIndex === -1) rolPermission.actions.push(e.action);
      else rolPermission.actions.splice(actionIndex, 1);

      return modified;
    });
  };

  const onRemove = (e: RemoveEvent) => {
    setAdded((prev) => {
      const modified = [...prev];
      modified.splice(e.index, 1);

      return modified;
    });
  };

  const onOpenDialog = () => setIsOpen(true);

  const onCloseDialog = () => setIsOpen(false);

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={onOpenDialog}>
        <Add className={classes.extendedIcon} />
        Agregar rol
      </Fab>
      <Dialog
        fullWidth
        open={isOpen}
        maxWidth="md"
        onClose={onCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar rol</DialogTitle>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <ModalContent className={classes.content}>
            <DialogContentText>
              Indique el nombre y descripción del nuevo rol. La asignación de permisos al rol es
              opcional
            </DialogContentText>
            <FormIconTitle title="Datos del nuevo rol" Icon={InfoOutlined} />
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
                required: { value: true, message: "Ingrese un nombre para el rol" },
                minLength: { value: 1, message: "Ingrese un nombre para el rol" },
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
                  placeholder="Descripción del rol"
                  helperText={errors.description ? errors.description.message : null}
                  error={errors.description ? true : false}
                />
              }
              rules={{
                required: { value: true, message: "Debe ingresar la descripción para el rol" },
                minLength: { value: 1, message: "Debe ingresar la descripción para el rol" },
                maxLength: {
                  value: 250,
                  message: "Solo se permite un máximo de 250 caracteres para la descripción",
                },
              }}
            />

            <FormIconTitle title="Asignar permisos al rol" Icon={AssignmentIndOutlined} />

            <AssignPermissions onSave={onSavePermissions} selected={added} />

            <List>
              {added.map((rolPermission, index) => {
                return (
                  <Fragment key={rolPermission.permission.id}>
                    <RolPermissionItem
                      index={index}
                      mode="permission"
                      onAction={onAction}
                      onRemove={onRemove}
                      rolPermission={rolPermission}
                    />
                    <Divider />
                  </Fragment>
                );
              })}
            </List>
          </ModalContent>
          <DialogActions>
            <Button onClick={onCloseDialog} color="primary">
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

export default CreateRol;
