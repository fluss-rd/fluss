import React, { FC, useState } from "react";
import { Container, CssBaseline, Toolbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../styles/theme";
import FlussAppBar from "./fluss-app-bar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(4),
    },
  })
);

export default MainLayout;
