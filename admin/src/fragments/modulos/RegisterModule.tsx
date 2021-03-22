import { Grid, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { EditLocationOutlined, InfoOutlined } from "@material-ui/icons";
import React, { FC } from "react";

interface RegisterModuleProps {
  open?: boolean;
}

const RegisterModule: FC<RegisterModuleProps> = (props) => {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <div className={classes.sectionTitle}>
        <InfoOutlined />
        <Typography variant="caption">DATOS</Typography>
      </div>
      <Grid container spacing={3} className={classes.formSection}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="NúmeroSIM"
            InputLabelProps={{ shrink: true }}
            InputProps={{ notched: true }}
          />
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
        <EditLocationOutlined />
        <Typography variant="caption">Ubicación</Typography>
      </div>
      <Grid container spacing={3} className={classes.formSection}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Latitud"
            InputLabelProps={{ shrink: true }}
            InputProps={{ notched: true }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            variant="outlined"
            label="Longitud"
            InputLabelProps={{ shrink: true }}
            InputProps={{ notched: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          Mapa
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
