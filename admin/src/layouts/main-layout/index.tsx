import { CssBaseline } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import React, { FC } from "react";

import theme from "../../styles/theme";
import FlussAppBar from "./fluss-app-bar";
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

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
});

const initValue = {
  drawerWidth: 240,
};

export const MainLayoutContext = React.createContext(initValue);

export default MainLayout;
