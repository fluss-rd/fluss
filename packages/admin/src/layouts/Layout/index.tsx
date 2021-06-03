import { makeStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import React, { FC, createContext } from "react";
import FlussDrawer from "./FlussDrawer";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <FlussDrawer />
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

