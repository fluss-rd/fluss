import { Button, Dialog, DialogActions, DialogTitle, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Info } from "@material-ui/icons";
import Permission from "models/Permission";
import React, { FC, useState } from "react";
import FormField from "shared/components/FormField";
import ModalContent from "shared/components/ModalContent";

import ModalFormDates from "../ModalFormDates";

interface EditPermissionProps {
  permission: Permission;
}

const EditPermission: FC<EditPermissionProps> = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { name, description, updatedAt, creationDate } = props.permission;

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
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
        <DialogTitle id="form-dialog-title">Detalle del permiso</DialogTitle>

        <ModalFormDates lastUpdate={updatedAt} creationDate={creationDate} />

        <div className={classes.formSection}>
          <ModalContent className={classes.content}>
            <FormField label="Nombre" value={name} placeholder="Nombre del rol" />
            <FormField
              multiline
              rows={5}
              value={description}
              label="Descripción"
              placeholder="Descripción del permiso"
            />
          </ModalContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

EditPermission.defaultProps = {
  permission: {
    id: "",
    actions: [],
    name: "",
    description: "",
    updatedAt: new Date(Date.now()),
    creationDate: new Date(Date.now()),
  },
};

const useStyles = makeStyles((theme) => ({
  formSection: {
    marginTop: theme.spacing(5),
  },
  content: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default EditPermission;
