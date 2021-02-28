import { Container, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { FC } from "react";
import theme from "../styles/theme";

const Layout: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">{children}</Container>
    </ThemeProvider>
  );
};

export default Layout;

