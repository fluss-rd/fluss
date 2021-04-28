import { Paper, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";

const Fluss404: NextPage = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Typography variant="h5">Error 404 - La ruta no fue encontrada</Typography>
      <br />
      <Typography variant="body1" color="textSecondary">
        Es probable que la página se encuentre en construcción o deshabilitada. En ese caso, intente
        más tarde.
      </Typography>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

export default Fluss404;
