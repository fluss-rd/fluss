import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import RegistrationAndUpdateDates from "components/RegistrarionAndUpdateDates";
import Role, { roleToRoleForm } from "models/Role";
import React, { FC, useState } from "react";
import { Role as RoleForm } from "services/auth/models";
import FormDialog from "components/FormDialog";

import RoleModalForm, { useRoleForm } from "./RoleForm";

interface EditRolProps {
  role: Role;
}

const EditRol: FC<EditRolProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, onSave] = useRoleForm(onSubmit, roleToRoleForm(role));

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  function onSubmit(data: RoleForm) {
    console.log({ data });
  }

  return (
    <>
      <IconButton onClick={openDialog}>
        <Edit />
      </IconButton>

      <FormDialog
        mode="edition"
        isOpen={isOpen}
        title="Editar rol"
        onClose={closeDialog}
        onSave={onSave}
      >
        <RegistrationAndUpdateDates registration={role.creationDate} lastUpdate={role.lastUpdate} />

        <RoleModalForm form={form} />
      </FormDialog>
    </>
  );
};

EditRol.defaultProps = {
  role: {
    id: "",
    name: "",
    description: "",
    lastUpdate: new Date(Date.now()),
    creationDate: new Date(Date.now()),
    permissions: [],
  },
};

export default EditRol;

