import { DialogContentText, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import FormDialog from "components/FormDialog";
import React, { FC, useState } from "react";
import { Role } from "services/auth/models";

import RoleForm, { useRoleForm } from "./RoleForm";

interface CreateRolProps {}

const CreateRol: FC<CreateRolProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const [form, onSave] = useRoleForm(onSubmit);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  function onSubmit(data: Role) {
    console.log({ data });
  }

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={openDialog}>
        <Add className={classes.extendedIcon} />
        Agregar rol
      </Fab>

      <FormDialog
        mode="registration"
        isOpen={isOpen}
        title="Registrar módulo"
        onClose={closeDialog}
        onSave={onSave}
      >
        <DialogContentText>
          Indique el nombre y descripción del nuevo rol. La asignación de permisos al rol es
          opcional
        </DialogContentText>
        <RoleForm form={form} />
      </FormDialog>
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
