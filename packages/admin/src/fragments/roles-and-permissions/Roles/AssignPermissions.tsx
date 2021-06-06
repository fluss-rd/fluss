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
import Permission, { mockPermissions } from "models/permission";
import React, { ChangeEvent, FC, useEffect, useState } from "react";

interface AssignPermissionsProps {
  onSave: (selectedPermissions: string[]) => void;
  defaultSelected?: string[];
}

const AssignPermissions: FC<AssignPermissionsProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Map<string, boolean>>(new Map());
  const classes = useStyles();
  const permissionNames = mockPermissions().map((p) => p.name);
  const labelId = "assign-permission-dialog";

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const updateSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    setSelected((prev) => {
      const modified = new Map<string, boolean>(prev);
      modified.set(value, checked);

      return modified;
    });
  };

  const sendSelection = () => {
    const selection: string[] = [];
    selected.forEach((isChecked, resource) => {
      if (!isChecked) return;
      selection.push(resource);
    });

    props.onSave(selection);
    closeDialog();
  };

  const fillSelected = () => {
    if (!props.defaultSelected) return;

    const selection = new Map<string, boolean>();
    props.defaultSelected.forEach((s: string) => selection.set(s, true));

    setSelected(selection);
  };

  useEffect(fillSelected, [open, props.defaultSelected]);

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
        open={isOpen}
      >
        <DialogTitle id={labelId}>Seleccionar permisos</DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          <List dense>
            {permissionNames.map((permission) => {
              return (
                <ListItem key={permission}>
                  <FormControlLabel
                    label={permission}
                    control={
                      <Checkbox
                        checked={selected.get(permission) || false}
                        onChange={updateSelection}
                        value={permission}
                        color="primary"
                      />
                    }
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
          <Button onClick={sendSelection} color="primary">
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
