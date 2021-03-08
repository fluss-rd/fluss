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
      <MainLayoutContext.Provider value={initValue}>
        <div className={classes.root}>
          <CssBaseline />
          <FlussDrawer />
          <FlussContainer>{children}</FlussContainer>
        </div>
      </MainLayoutContext.Provider>
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

const initValue = {
  drawerWidth: 240,
};

export const MainLayoutContext = React.createContext(initValue);

export default MainLayout;
