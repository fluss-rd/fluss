import { Button, Dialog, DialogActions, DialogTitle, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mockUsers } from "models/User";
import React, { FC } from "react";
import FormField from "shared/components/FormField";
import ModalContent from "shared/components/ModalContent";
import formatDate from "shared/helpers/formatDate";
import { useMergeState } from "shared/hooks";
import useRefCallback from "shared/hooks/useRefCallback";

import UserForm, { UserFormModel, UserFormRef } from "./UserForm";

interface EditUserProps {
  isOpen: boolean;
  close: () => void;
  id: string;
}

const EditUser: FC<EditUserProps> = (props) => {
  const classes = useStyles();
  const [userFormRef, setUserFormRef] = useRefCallback(initializeForm, [props.id]);
  const [dates, setDates] = useMergeState({
    registration: new Date(Date.now()),
    update: new Date(Date.now()),
  });

  function initializeForm(ref: UserFormRef) {
    const users = mockUsers();
    const match = users.find((u) => u.id === props.id);

    // Fill form with the selected user data.
    if (!match) return;

    ref.form.reset({
      name: match.name || "",
      surname: match.surname || "",
      email: match.email || "",
      rolName: match.roleName || "",
      status: match.status || "active",
    });

    // Fill user dates.
    setDates({ update: match.lastUpdate, registration: match.creationDate });
  }

  function onSubmit(data: UserFormModel) {
    console.log({ data });
  }

  return (
    <Dialog
      fullWidth
      onClose={props.close}
      classes={{ paper: classes.paper, paperScrollPaper: classes.paperScrollPaper }}
      open={props.isOpen}
      maxWidth="md"
    >
      <DialogTitle>Editar información de usuario</DialogTitle>
      <ModalContent spacing={2} dividers>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <FormField
              disabled
              variant="standard"
              label="Fecha de registro"
              value={formatDate(dates.registration)}
            />
          </div>
          <div>
            <FormField
              disabled
              variant="standard"
              label="Última actualización"
              value={formatDate(dates.update)}
            />
          </div>
        </div>
        <UserForm ref={setUserFormRef} />
      </ModalContent>
      <DialogActions>
        <Button onClick={props.close} color="primary">
          Cancelar
        </Button>
        <Button color="primary" onClick={() => userFormRef.current.form.handleSubmit(onSubmit)()}>
          Guardar cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles({
  form: {},
  paper: {},
  paperScrollPaper: {},
});

export default EditUser;

