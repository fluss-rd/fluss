import { Container, CssBaseline, Toolbar } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React, { FC } from "react";

import FlussAppBar from "./FlussAppBar";
import Footer from "./Footer";

const MainLayout: FC = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();
  const isInHome = router.pathname === "/";

  return (
    <div className={classes.root}>
      <CssBaseline />
      <FlussAppBar />
      <Toolbar />
      <div style={{ flexGrow: 1 }}>{children}</div>
      {isInHome && <Footer />}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default MainLayout;

