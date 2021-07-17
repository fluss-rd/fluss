import { Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { NextPage } from "next";
import React from "react";

const Fluss404: NextPage = () => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.container)}>
      <Typography variant="h5">Error 404 - La ruta no fue encontrada</Typography>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export default Fluss404;
