import { Paper, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";

interface Fluss404Props {}

const Fluss404: FC<Fluss404Props> = (props) => {
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
