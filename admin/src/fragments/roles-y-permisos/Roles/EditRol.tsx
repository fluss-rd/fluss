import { Dialog, DialogTitle, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Info } from "@material-ui/icons";
import Rol from "models/Rol";
import React, { FC, useState } from "react";

import ModalFormDates from "../ModalFormDates";
import RolModalForm, { RolForm } from "./RolModalForm";

interface EditRolProps {
  rol: Rol;
}

const EditRol: FC<EditRolProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();
  const {
    rol: { name, description, lastUpdate, creationDate },
  } = props;

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const handleSave = (data: RolForm) => console.log(data);

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

        <ModalFormDates lastUpdate={lastUpdate} creationDate={creationDate} />

        <div className={classes.formSection}>
          <RolModalForm
            cancelForm={closeDialog}
            onSaveForm={handleSave}
            values={{ name, description }}
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
