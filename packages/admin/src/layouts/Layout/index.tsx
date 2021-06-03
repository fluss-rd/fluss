import { CssBaseline } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Settings from "fragments/Settings";
import withAuth from "hoc/withAuth";
import React, { createContext, FC } from "react";

import FlussDrawer from "./FlussDrawer";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <FlussDrawer />
      <main className={classes.content}>{children}</main>
      <Settings />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const LayoutContext = createContext({
  drawerWidth: 240,
});

//export default withAuth(Layout);
export default Layout;
