import { Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { EditLocationOutlined, InfoOutlined } from "@material-ui/icons";
import React, { FC, useCallback, useState } from "react";
import InputMask from "react-input-mask";

import ModuleLocation from "./ModuleLocation";

interface RegisterModuleProps {
  open?: boolean;
}

const RegisterModule: FC<RegisterModuleProps> = (props) => {
  const classes = useStyles();
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const handleLocationChange = useCallback((latitude: number, longitude: number) => {
    setLocation({ latitude, longitude });
  }, []);

  return (
    <form className={classes.root}>
      <div className={classes.sectionTitle}>
        <InfoOutlined color="action" />
        <Typography variant="caption" color="textSecondary">
          DATOS
        </Typography>
      </div>
      <Grid container spacing={3} className={classes.formSection}>
        <Grid item xs={12} md={6}>
          <InputMask mask="(999) 999-9999" maskChar=" ">
            {() => (
              <TextField
                fullWidth
                placeholder="(###) ###-###"
                variant="outlined"
                label="NúmeroSIM"
                InputLabelProps={{ shrink: true }}
                InputProps={{ notched: true }}
              />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Serial"
            InputLabelProps={{ shrink: true }}
            InputProps={{ notched: true }}
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
            value={location.latitude}
            InputLabelProps={{ shrink: true }}
            InputProps={{ notched: true }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            variant="outlined"
            label="Longitud"
            value={location.longitude}
            InputLabelProps={{ shrink: true }}
            InputProps={{ notched: true }}
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
    </form>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
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
}));

export default RegisterModule;
