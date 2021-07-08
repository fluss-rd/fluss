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
  const isInMonitor = router.pathname === "/monitor";

  return (
    <div className={classes.root}>
      <CssBaseline />
      <FlussAppBar />
      <div style={{ flexGrow: 1 }}>
        {children && (
          <>
            <Toolbar />
            {!isInHome ? (
              <Container maxWidth="lg" className={classes.container}>
                {children}
              </Container>
            ) : (
              children
            )}
          </>
        )}
      </div>
      <Footer />
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

