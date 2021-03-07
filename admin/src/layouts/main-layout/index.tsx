import { CssBaseline } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React, { FC } from "react";

import theme from "../../styles/theme";
import FlussContainer from "./fluss-container";
import FlussDrawer from "./fluss-drawer";

const MainLayout: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <FlussDrawer />
        <FlussContainer>{children}</FlussContainer>
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

export default MainLayout;
