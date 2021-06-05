import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { mockUsers } from "models/user2";
import React, { FC } from "react";
import ModalContent from "shared/components/ModalContent";
import useRefCallback from "shared/hooks/useRefCallback";

import UserForm, { UserFormModel, UserFormRef } from "./UserForm";

interface EditUserProps {
  isOpen: boolean;
  close: () => void;
  id: string;
}

const EditUser: FC<EditUserProps> = (props) => {
  const [userFormRef, setUserFormRef] = useRefCallback(initializeForm, [props.id]);

  function initializeForm(ref: UserFormRef) {
    const users = mockUsers();
    const match = users.find((u) => u.id === props.id);

    ref.form.reset({
      name: match?.name || "",
      surname: match?.surname || "",
      email: match?.email || "",
      rolName: match?.roleName || "",
    });
  }

  function onSubmit(data: UserFormModel) {
    console.log({ data });
  }

  return (
    <Dialog
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
      open={props.isOpen}
      maxWidth="md"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Editar información de usuario</DialogTitle>
      <form noValidate autoComplete="off">
        <ModalContent spacing={2}>
          <UserForm ref={setUserFormRef} />
        </ModalContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={() => userFormRef.current.form.handleSubmit(onSubmit)()}>
            Registrar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUser;
