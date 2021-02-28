import React, { FC } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { AppBar as Navbar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

interface FlussAppBarProps {}

const FlussAppBar: FC<FlussAppBarProps> = () => {
  const classes = useStyles();

  return (
    <Navbar position="fixed" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          Aplicación
        </Typography>
        <div className={classes.endButtons}>
          <Button color="inherit">Página 1</Button>
        </div>
      </Toolbar>
    </Navbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      cursor: "pointer",
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
