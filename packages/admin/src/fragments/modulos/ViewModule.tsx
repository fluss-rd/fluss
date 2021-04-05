import {
  AppBar,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close, EditLocationOutlined, InfoOutlined } from "@material-ui/icons";
import Module from "models/Module";
import React, { FC, useEffect, useMemo } from "react";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import FormSelect from "shared/components/FormSelect";
import Transition from "shared/components/Transition";
import useMergeState from "shared/hooks/useMergeState";

import ModuleLocation from "./ModuleLocation";

interface ViewModuleProps {
  module?: Module;
  close?: () => void;
  onSave?: (module: Module) => void;
}

const ViewModule: FC<ViewModuleProps> = (props) => {
  const classes = useStyles();
  const locations = useMemo(() => ["Yaque del Norte", "Yaque del Sur"], []);
  const [module, setModule] = useMergeState({} as Module);

  useEffect(() => {
    if (props.module) setModule(new Module(props.module));
  }, [props.module]);

  return (
    <Dialog
      fullScreen
      open={props.module ? true : false}
      onClose={props.close}
      TransitionComponent={Transition}
    >
      <form>
        <AppBar className={classes.appBar} color="inherit" elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.close} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Información de módulo
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                props.onSave(module);
                props.close();
              }}
            >
              Guardar cambios
            </Button>
          </Toolbar>
          <Divider />
        </AppBar>
        <div className={classes.content}>
          <Grid container spacing={4} className={classes.form}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                {/* Datos */}
                <Grid item xs={12}>
                  <FormIconTitle Icon={InfoOutlined} title="Detalle" />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormField
                        name="phone"
                        label="Teléfono"
                        value={module.simNumber}
                        onChange={(e) => setModule({ simNumber: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormField
                        name="serial"
                        label="Serial"
                        value={module.serial}
                        onChange={(e) => setModule({ serial: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormField
                        name="creationDate"
                        label="Fecha de registro"
                        type="date"
                        value={module.createdAt}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* Ubicación */}
                <Grid item xs={12}>
                  <FormIconTitle Icon={EditLocationOutlined} title="Ubicación" />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormField
                        name="latitude"
                        label="Latitud"
                        type="number"
                        value={module.latitude}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormField
                        name="longitude"
                        label="Longitud"
                        type="number"
                        value={module.longitude}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormSelect
                        noneText="Ninguno"
                        label="Cuerpo hídrico"
                        value={module.river}
                        onChange={(e) => setModule({ river: e.target.value as string })}
                      >
                        {locations.map((location, i) => (
                          <MenuItem key={i} value={location}>
                            {location}
                          </MenuItem>
                        ))}
                      </FormSelect>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <ModuleLocation onNewMarker={(l, g) => setModule({ latitude: l, longitude: g })} />
                <br />
                <Typography style={{ fontWeight: "bold" }} color="textSecondary">
                  Ubicación
                </Typography>
                <Typography color="textSecondary">{module.river}</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </form>
    </Dialog>
  );
};

export default ViewModule;

const useStyles = makeStyles((theme) => {
  const minHeight = `calc(100vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(
    3
  )}px - ${theme.spacing(0.1)}px)`;
  return {
    content: {
      padding: theme.spacing(3),
      width: "100%",
    },
    form: {
      minHeight,
    },
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  };
});
