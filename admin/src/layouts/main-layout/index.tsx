import { CssBaseline, useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";
import React, { FC, useMemo, useState } from "react";

import FlussAppBar from "./fluss-app-bar";
import FlussContainer from "./fluss-container";
import FlussDrawer from "./fluss-drawer";

const MainLayout: FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const Children = useMemo(() => () => <>{children}</>, [children]);
  const [sidebarInMobileIsOpen, setSidebarInMobileIsOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <DrawerValuesContext.Provider
        value={{
          drawerWidth: initValue.drawerWidth,
          mdUp: matches,
          sidebarInMobileIsOpen,
          closeSidebarInMobile: () => setSidebarInMobileIsOpen(false),
          toggleMobileSidebar: () => setSidebarInMobileIsOpen((prev) => !prev),
        }}
      >
        <div className={classes.root}>
          <CssBaseline />
          <FlussAppBar />
          <FlussDrawer />
          <FlussContainer>
            <Children />
          </FlussContainer>
        </div>
      </DrawerValuesContext.Provider>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
}));

const initValue = {
  drawerWidth: 240,
  mdUp: false,
  sidebarInMobileIsOpen: false,
  closeSidebarInMobile: () => {},
  toggleMobileSidebar: () => {},
};

export type DrawerValues = typeof initValue;
export const DrawerValuesContext = React.createContext(initValue);

export default React.memo(MainLayout);
