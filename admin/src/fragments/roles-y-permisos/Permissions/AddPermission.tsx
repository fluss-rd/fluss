import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  List,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add, AssignmentIndOutlined, InfoOutlined } from "@material-ui/icons";
import ActionsModel from "models/Actions";
import Permission from "models/Permission";
import Rol from "models/Rol";
import React, { FC, Fragment, useMemo, useState } from "react";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import ModalContent from "shared/components/ModalContent";
import { useMergeState } from "shared/hooks";

import RolPermission from "../RolPermission";
import AssignRoles from "./AssignRoles";

interface AddPermissionProps {}

const AddPermission: FC<AddPermissionProps> = (props) => {
  // State.
  const [isOpen, setIsOpen] = useState(false);
  const [added, setAdded] = useState<ActionsModel[]>([]);
  const [permissionForm, setPermissionForm] = useMergeState({
    id: "new",
    name: "",
    description: "",
    roles: [],
  });

  // Computed
  const classes = useStyles();
  const handleClickOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const roles = useMemo(() => Rol.mockData(), []);

  // Methods.
  function handleRoles(roles: Rol[]) {
    const permission = { ...permissionForm } as Permission;
    const actions = roles.map(
      (rol: Rol, i: number) =>
        ({
          rol: rol,
          id: `a${i}`,
          read: true,
          write: true,
          delete: true,
          permission,
        } as ActionsModel)
    );

    setAdded(actions);
  }

  function handleActions(actions: ActionsModel, index: number): void {
    setAdded((prev) => {
      const modified = [...prev];
      modified[index] = actions;
      return modified;
    });
  }

  function deleteActions(actions: ActionsModel, index: number): void {
    setAdded((prev) => {
      const modified = [...prev];
      modified.splice(index, 1);
      return modified;
    });
  }

  function getAddedRoles(): Record<string, boolean> {
    const addedRoles = {};
    for (let i = 0; i < roles.length; i++) {
      const rol = roles[i];
      const isAdded = added.find((actions) => actions.rol.id === rol.id);

      if (isAdded) {
        const index = i.toString();
        addedRoles[index] = true;
      }
    }

    return addedRoles;
  }

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={handleClickOpen}>
        <Add className={classes.extendedIcon} />
        Agregar permiso
      </Fab>
      <Dialog
        fullWidth
        open={isOpen}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar permiso</DialogTitle>
        <ModalContent className={classes.content}>
          <DialogContentText>
            Indique el nombre y descripción del nuevo permiso. La asignación de roles es opcional
          </DialogContentText>
          <FormIconTitle title="Datos del nuevo permiso" Icon={InfoOutlined} />
          <FormField name="name" label="Nombre" />
          <FormField multiline name="name" label="Descripción" rows={5} />

          <br />

          <FormIconTitle title="Asignar a roles" Icon={AssignmentIndOutlined} />

          <AssignRoles onSave={handleRoles} selected={getAddedRoles()} />

          <List>
            {added.map((action: ActionsModel, i: number) => (
              <Fragment key={action.id}>
                <RolPermission
                  key={action.id}
                  actions={action}
                  index={i}
                  handleActionsChange={handleActions}
                  remove={deleteActions}
                />
                <Divider />
              </Fragment>
            ))}
          </List>
        </ModalContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary" type="submit">
            Registrar
          </Button>
        </DialogActions>
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
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

export default AddPermission;
