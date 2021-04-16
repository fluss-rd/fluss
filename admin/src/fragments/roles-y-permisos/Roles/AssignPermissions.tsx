import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import Permission from "models/Permission";
import RolPermission from "models/RolPermission";
import React, { ChangeEvent, FC, useEffect, useState } from "react";

interface AssignPermissionsProps {
  onSave: (permissions: Permission[]) => void;
  selected?: RolPermission[];
}

const AssignPermissions: FC<AssignPermissionsProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, string>>({});

  useEffect(() => setSelected(fromSelected()), [open, props.selected]);

  const classes = useStyles();
  const permissions = Permission.mockData();
  const labelId = "permissions-selection-dialog";

  const openDialog = () => setOpen(true);

  const closeDialog = () => setOpen(false);

  const updateSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected((prev) => {
      const modified = { ...prev };
      const { checked, name, value } = e.target;

      console.log(checked, name, value);

      if (!checked) delete modified[name];
      else modified[name] = value;

      return modified;
    });
  };

  const save = () => {
    const findPermission = (id: string) => permissions.find((p) => p.id === id);
    const selectedPermissions: Permission[] = Object.keys(selected).map(findPermission);

    closeDialog();
    props.onSave(selectedPermissions);
  };

  function fromSelected(): Record<string, string> {
    const rolPermissions: Record<string, string> = {};
    props.selected.forEach((s, i) => (rolPermissions[s.permission.id] = i.toString()));

    return rolPermissions;
  }

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        startIcon={<Add />}
        onClick={openDialog}
      >
        Agregar
      </Button>
      <Dialog
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="sm"
        aria-labelledby={labelId}
        open={open}
      >
        <DialogTitle id={labelId}>Selectionar permisos</DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          <List dense>
            {permissions.map((permission: Permission, index: number) => {
              return (
                <ListItem key={permission.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selected[permission.id] ? true : false}
                        onChange={updateSelected}
                        value={index}
                        name={permission.id}
                        color="primary"
                      />
                    }
                    label={permission.name}
                  />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={save} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingLeft: theme.spacing(1),
  },
}));

export default AssignPermissions;
