import { Dialog, DialogTitle, Divider, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Info } from "@material-ui/icons";
import Permission from "models/Permission";
import React, { FC, useState } from "react";

import ModalFormDates from "../ModalFormDates";
import PermissionModalForm, { PermissionForm } from "./PermissionModalForm";

interface EditPermissionProps {
  permission: Permission;
}

const EditPermission: FC<EditPermissionProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();
  const {
    permission: { name, description, updatedAt, creationDate },
  } = props;

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const handleSave = (data: PermissionForm) => console.log(data);
  const updateValues = (data: PermissionForm) => console.log(data);

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
          <PermissionModalForm
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

EditPermission.defaultProps = {
  permission: {
    id: "",
    name: "",
    description: "",
    updatedAt: new Date(Date.now()),
    roles: [],
    creationDate: new Date(Date.now()),
  },
};

const useStyles = makeStyles((theme) => ({
  formSection: {
    marginTop: theme.spacing(5),
  },
}));

export default EditPermission;
