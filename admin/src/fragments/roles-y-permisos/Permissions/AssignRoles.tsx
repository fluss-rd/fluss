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
import Rol from "models/Rol";
import React, { ChangeEvent, FC, useEffect, useState } from "react";

interface AssignRolesProps {
  onSave: (roles: Rol[]) => void;
  selected?: Record<string, boolean>;
}

const AssignRoles: FC<AssignRolesProps> = ({ onSave, ...props }) => {
  // State.
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<boolean>(false);

  // Effects.
  useEffect(() => setSelected(props.selected), [props.selected]);

  // Computed.
  const classes = useStyles();
  const roles = Rol.mockData();
  const labelId = "roles-selection-dialog";

  // Methods.
  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  const handleSelectedRol = (e: ChangeEvent<HTMLInputElement>) =>
    setSelected((prev) => {
      const modified = { ...prev };
      const checked = e.target.checked;
      const key = e.target.name;

      if (!checked) delete modified[key];
      else modified[key] = checked;

      return modified;
    });

  const handleSave = () => {
    const selectedRoles: Rol[] = Object.keys(selected).map((key) => roles[parseInt(key, 10)]);
    handleClose();
    onSave(selectedRoles);
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        startIcon={<Add />}
        onClick={handleOpen}
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
        <DialogTitle id={labelId}>Seleccionar roles</DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          <List dense>
            {roles.map((rol: Rol, i: number) => {
              const name = i.toString();
              return (
                <ListItem key={rol.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selected[name] === undefined ? false : selected[name]}
                        onChange={handleSelectedRol}
                        name={name}
                        color="primary"
                      />
                    }
                    label={rol.name}
                  />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AssignRoles.defaultProps = {
  selected: {},
};

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingLeft: theme.spacing(1),
  },
}));

export default AssignRoles;
