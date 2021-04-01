import { Container, CssBaseline, Toolbar } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React, { FC } from "react";

import theme from "styles/theme";
import FlussAppBar from "./FlussAppBar";

const MainLayout: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FlussAppBar />
      {children ? (
        <>
          <Toolbar />
          <Container maxWidth="lg" className={classes.container}>
            {children}
          </Container>
        </>
      ) : (
        children
      )}
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
}));

export default MainLayout;

