import { Dialog, DialogTitle, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Info } from "@material-ui/icons";
import Rol from "models/Rol";
import React, { FC, useState } from "react";
import { Role as RoleForm } from "services/auth/models";

import ModalFormDates from "../ModalFormDates";
import RoleModalForm from "./RoleForm";

interface EditRolProps {
  rol: Rol;
}

const EditRol: FC<EditRolProps> = ({ rol }) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleSave = (data: RoleForm) => {
    console.log(data);
  };

  return (
    <>
      <IconButton onClick={openDialog}>
        <Info />
      </IconButton>
      <Dialog
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Detalle del rol</DialogTitle>

        <ModalFormDates lastUpdate={rol.lastUpdate} creationDate={rol.creationDate} />

        <div className={classes.formSection}>
          <RoleModalForm
            cancelForm={closeDialog}
            onSaveForm={handleSave}
            values={Rol.toRoleForm(rol)}
          />
        </div>
      </Dialog>
    </>
  );
};

// Nombre, correo,

EditRol.defaultProps = {
  rol: {
    id: "",
    name: "",
    description: "",
    lastUpdate: new Date(Date.now()),
    creationDate: new Date(Date.now()),
    permissions: [],
  },
};

const useStyles = makeStyles((theme) => ({
  formSection: { marginTop: theme.spacing(5) },
}));

export default EditRol;
