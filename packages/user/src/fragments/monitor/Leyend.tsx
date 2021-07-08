import React, { FC } from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import { Button, ButtonProps, Typography } from "@material-ui/core";
import clsx from "clsx";

const Leyend: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
        Índice de contaminación (ICA)
      </Typography>
      <div className={classes.categories}>
        <IcaCategory background="#219653">Excelente</IcaCategory>
        <IcaCategory background="#27AE60">Buena</IcaCategory>
        <IcaCategory background="#2D9CDB">Moderada</IcaCategory>
        <IcaCategory background="#F2994A">Mala</IcaCategory>
        <IcaCategory background="#EB5757">Muy mala</IcaCategory>
      </div>
    </div>
  );
};

interface IcaCategory {
  background: string;
}
const IcaCategory: FC<IcaCategory> = ({ background, children }) => {
  const classes = useStyles();
  return (
    <div style={{ background, color: "white" }} className={classes.button}>
      {children}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: theme.spacing(2),
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    flexDirection: "column",
    "& > :not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  categories: {
    display: "flex",
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  button: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
  },
}));

export default Leyend;

