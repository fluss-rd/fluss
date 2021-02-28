import React, { FC, useState } from "react";
import { Container, CssBaseline, Toolbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../styles/theme";
import FlussAppBar from "./fluss-app-bar";

interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FlussAppBar />
      {children ? (
        <>
          <Toolbar />
          <Container maxWidth="lg">{children}</Container>
        </>
      ) : (
        children
      )}
    </ThemeProvider>
  );
};

export default MainLayout;
