import { Dialog, DialogContentText, DialogTitle, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import React, { FC, useState } from "react";
import ModalContent from "shared/components/ModalContent";
import { Role } from "services/auth/models";

import RolModalForm from "./AddRol";

interface CreateRolProps {}

const CreateRol: FC<CreateRolProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const openDialog = () => {
    setIsOpen(true);
  }

  const closeDialog = () => {
    setIsOpen(false);
  }

  const saveNewRol = (data: Role) => {
    console.log(data);
  }

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={openDialog}>
        <Add className={classes.extendedIcon} />
        Agregar rol
      </Fab>
      <Dialog
        fullWidth
        open={isOpen}
        maxWidth="md"
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar rol</DialogTitle>
        <ModalContent style={{ height: "0px" }}>
          <DialogContentText>
            Indique el nombre y descripción del nuevo rol. La asignación de permisos al rol es
            opcional
          </DialogContentText>
        </ModalContent>
        <br />
        <RolModalForm cancelForm={closeDialog} onSaveForm={saveNewRol} />
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

