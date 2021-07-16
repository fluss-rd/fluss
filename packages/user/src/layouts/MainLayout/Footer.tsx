import { Button, Grid, Typography } from "@material-ui/core";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Image from "next/image";
import React, { FC } from "react";
import TextField from "shared/components/FormField";

interface FooterProps {}

const Footer: FC<FooterProps> = (props) => {
  const { root, curved, secondLevel, suscription, contact, footer, ...styles } = useStyles();

  return (
    <div className={root}>
      <div className={curved}></div>
      <div className={clsx(styles.center, footer)}>
        <br></br>
        <p>Copyright © 2020, Fluss Inc.</p>
      </div>
    </div>
  );
};

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "calc(100vh/3)",
    display: "flex",
    flexFlow: "column",
    textAlign: "center",
  },
  curved: {
    borderRadius: "80% 80% 0 0",
    background: theme.palette.secondary.main,
    minHeight: 50,
    padding: theme.spacing(2),
  },
  secondLevel: {
    background: lighten(theme.palette.primary.main, 0.2),
    padding: theme.spacing(6),
  },
  contact: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    color: theme.palette.common.white,
  },
  suscription: {
    height: "100%",
    padding: theme.spacing(2),
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
  footer: {
    width: "100%",
    background: "#BEA69A",
    color: "white",
    textAlign: "center",
  },
  whiteTextField: {
    color: "white",
    borderColor: "white",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBox: {
    position: "relative",
    width: 100,
    background: "white",
    height: 120,
    "& > div > div:first-child": {
      borderRadius: 30,
    },
  },
}));

const textFieldConfig = {
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
        color: "white",
      },
    },
  },
};

const CssTextField = withStyles(textFieldConfig)(TextField);

export default Footer;
