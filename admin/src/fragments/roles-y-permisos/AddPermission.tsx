import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Fab,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add, AssignmentIndOutlined, InfoOutlined } from "@material-ui/icons";
import FormField from "components/FormField";
import FormIconTitle from "components/FormIconTitle";
import FormSelect from "components/FormSelect";
import ModalContent from "components/ModalContent";
import Rol from "models/Rol";
import React, { FC, useMemo, useState } from "react";

interface AddPermissionProps {}

const AddPermission: FC<AddPermissionProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const classes = useStyles();
  const handleClickOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const roles = useMemo(() => Rol.mockData(), []);

  function handleChange(e: React.ChangeEvent<{ name: string; value: string[] }>) {
    setSelected(e.target.value);
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

          <FormSelect
            multiple
            noneText="Ninguno seleccionado"
            label="Roles"
            value={selected}
            onChange={handleChange}
            renderValue={(selected: string[]) => (
              <div className={classes.chips}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} className={classes.chip} color="secondary" />
                ))}
              </div>
            )}
          >
            {roles.map((rol: Rol) => (
              <MenuItem key={rol.id} value={rol.name}>
                {rol.name}
              </MenuItem>
            ))}
          </FormSelect>
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
