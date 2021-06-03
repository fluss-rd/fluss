import { CssBaseline } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
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
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const LayoutContext = createContext({
  drawerWidth: 240,
});

export default withAuth(Layout);
