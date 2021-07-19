import { Button, Dialog, DialogActions, DialogTitle, Grid } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
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
    // TODO: submit data.
  }

  return (
    <Dialog fullWidth onClose={props.close} open={props.isOpen} maxWidth="md">
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
        <br />
        <br />

        <Button startIcon={<DeleteForeverIcon />} variant="outlined" className={classes.deleteUser}>
          Eliminar Usuario
        </Button>
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
  deleteUser: {
    color: red[600],
    borderColor: red[600],
    "&:hover": {
      backgroundColor: red[50],
    },
  },
});

export default EditUser;
