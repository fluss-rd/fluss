import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Add, EditLocationOutlined, InfoOutlined } from "@material-ui/icons";
import RegisterModuleForm from "models/RegisterModuleForm";
import React, { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";

import ModuleLocation from "./ModuleLocation";

interface OpenFormButtonProps {}

const RegisterModule: FC<OpenFormButtonProps> = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const { register, errors, handleSubmit, formState, setValue } = useForm({
    mode: "onTouched",
  });

  const handleLocationChange = useCallback((latitude: number, longitude: number) => {
    setLocation({ latitude, longitude });
  }, []);

  const onSubmit = (form: RegisterModuleForm) => console.log(form);

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={handleClickOpen}>
        <Add className={classes.extendedIcon} />
        Registrar módulo
      </Fab>
      <Dialog
        fullWidth
        open={isOpen}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Registrar módulo</DialogTitle>
          <div className={classes.content}>
            <DialogContentText>
              Llene el siguiente formulario pare efectuar el registro. Asegúrese de colocar los
              datos correctos del dispositivo para que la conexión pueda establecerse con éxito.
            </DialogContentText>
            <div className={classes.sectionTitle}>
              <InfoOutlined color="action" />
              <Typography variant="caption" color="textSecondary">
                DATOS
              </Typography>
            </div>
            <div>
              <Grid container xs={12} spacing={3} className={classes.formSection}>
                <Grid item xs={12} md={6}>
                  <ReactInputMask mask="(999) 999-9999" maskChar=" ">
                    {() => (
                      <TextField
                        fullWidth
                        name="simNumber"
                        placeholder="(###) ###-###"
                        variant="outlined"
                        label="NúmeroSIM"
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ notched: true }}
                        inputRef={register({ required: true })}
                      />
                    )}
                  </ReactInputMask>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Serial"
                    name="serial"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      notched: true,
                      onChange: (e) => setValue(e.target.name, e.target.value),
                    }}
                    inputRef={register({ required: true, min: 4 })}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <div className={classes.sectionTitle}>
                <EditLocationOutlined color="action" />
                <Typography variant="caption" color="textSecondary">
                  Ubicación
                </Typography>
              </div>
              <Grid container spacing={3} className={classes.formSection}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Latitud"
                    name="latitude"
                    value={location.latitude}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ notched: true }}
                    inputRef={register({ required: true })}
                  />
                  <br />
                  <br />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Longitud"
                    name="longitude"
                    value={location.longitude}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ notched: true }}
                    inputRef={register({ required: true })}
                  />
                  <br />
                  <br />
                  <Typography variant="caption" color="textSecondary">
                    Haba click en el mapa para cambiar la ubicación de registro
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ModuleLocation onNewMarker={handleLocationChange} />
                </Grid>
              </Grid>
            </div>
          </div>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button color="primary" type="submit" disabled={!formState.isValid}>
              Registrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    paddingLeft: theme.spacing(3.2),
    paddingRight: theme.spacing(3.2),
    paddingBottom: theme.spacing(3.2),
  },
  formSection: {},
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default RegisterModule;
