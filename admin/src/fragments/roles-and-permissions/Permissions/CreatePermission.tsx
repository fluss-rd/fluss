import { Dialog, DialogContentText, DialogTitle, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import React, { FC, useState } from "react";
import ModalContent from "shared/components/ModalContent";

import PermissionModalForm, { PermissionForm } from "./PermissionModalForm";

const CreatePermission: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const handleClickOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleSave = (data: PermissionForm) => console.log(data);

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
        <ModalContent>
          <DialogContentText>Indique el nombre y descripción del nuevo permiso.</DialogContentText>
        </ModalContent>
        <PermissionModalForm cancelForm={handleClose} onSaveForm={handleSave} />
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
