import { AppBar as Navbar, Divider, Toolbar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";

import FlussLogo from "../fluss-logo";

const FlussAppBar: FC = () => {
  const classes = useStyles();

  return (
    <Navbar position="fixed" color="transparent" elevation={0}>
      <Toolbar>
        <FlussLogo />
        <div className={classes.endButtons}>{/*TODO:*/}</div>
      </Toolbar>
      <Divider />
    </Navbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      fontSize: theme.typography.h5.fontSize,
      color: theme.palette.primary.main,
      cursor: "pointer",
      textTransform: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    endButtons: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& > *:not(:last-child)": {
        marginRight: theme.spacing(3),
      },
    },
  })
);

export default FlussAppBar;
