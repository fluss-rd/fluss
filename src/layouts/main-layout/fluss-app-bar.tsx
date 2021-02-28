import React, { FC } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { AppBar as Navbar, Toolbar, Typography, Button, Divider } from "@material-ui/core";

interface FlussAppBarProps {}

const FlussAppBar: FC<FlussAppBarProps> = () => {
  const classes = useStyles();

  return (
    <Navbar position="fixed" color="transparent" elevation={0}>
      <Toolbar>
        <div className={classes.brand}>
          <img src="/images/logo.png" alt="Logo" className={classes.logo} />
          <Typography className={classes.title} variant="h6" noWrap>
            fluss
          </Typography>
        </div>
        <div className={classes.startButtons}>
          <Button color="primary" variant="outlined" className={classes.reportsButton}>
            Datos y reportes
          </Button>
        </div>
        <div className={classes.endButtons}>
          <Button color="inherit">Inicio</Button>
          <Button color="inherit">Reportes recientes</Button>
          <Button color="inherit">¿Quiénes somos?</Button>
        </div>
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
    },
    logo: {
      width: 35,
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      fontSize: theme.typography.h5.fontSize,
      color: theme.palette.primary.main,
      cursor: "pointer",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    startButtons: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
    },
    reportsButton: {
      borderRadius: 10,
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
