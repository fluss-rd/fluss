import { Dialog, DialogTitle, IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import Role from "models/Role";
import React, { FC, useState } from "react";
import { Role as RoleForm } from "services/auth/models";
import ModalContent from "shared/components/ModalContent";

import RegistrationAndUpdateDates from "components/RegistrarionAndUpdateDates";
import RoleModalForm from "./RoleForm";

interface EditRolProps {
  rol: Role;
}

const EditRol: FC<EditRolProps> = ({ rol }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <Edit />
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

        <ModalContent spacing={2}>
          <RegistrationAndUpdateDates registration={rol.creationDate} lastUpdate={rol.lastUpdate} />
        </ModalContent>

        <RoleModalForm
          cancelForm={closeDialog}
          onSaveForm={handleSave}
          values={Role.toRoleForm(rol)}
        />
      </Dialog>
    </>
  );
};

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

export default EditRol;

