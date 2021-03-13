import { Button, Divider, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";

import { push } from "../../../helpers";
import FlussLogo from "../fluss-logo";

const DrawerHeader: FC = () => {
  const classes = useStyles();

  return (
    <>
      <FlussLogo />
      <Divider />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      display: "flex",
      ...theme.mixins.toolbar,
    },
    brand: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      marginRight: theme.spacing(3),
      padding: 0,
      flexGrow: 1,
      textAlign: "left",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
      display: "none",
      fontSize: theme.typography.body1.fontSize,
      color: theme.palette.primary.main,
      cursor: "pointer",
      textTransform: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  };
});

export default FlussLogo;
