import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  CssBaseline,
  List,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
} from "@material-ui/core";
import { Menu, Home, Grain, People, Lock, Notifications, Settings } from "@material-ui/icons";
import React, { FC, useState, createContext } from "react";
import DrawerItem from "./DrawerItem";
import FlussDrawer from "./FlussDrawer";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <FlussDrawer>
        <List>
          <DrawerItem title="Inicio" icon={Home} />
          <DrawerItem title="Cuerpos hídricos" icon={Grain} />
          <DrawerItem title="Usuarios" icon={People} />
          <DrawerItem title="Roles y permisos" icon={Lock} />
        </List>
        <Divider />
        <List>
          <DrawerItem title="Notificaiones" icon={Notifications} />
          <DrawerItem title="Ajustes" icon={Settings} />
        </List>
      </FlussDrawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

const drawerWidth = 240;
export const LayoutContext = createContext({
  drawerWidth,
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default Layout;

