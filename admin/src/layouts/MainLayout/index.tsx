import { CssBaseline, useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Settings from "components/Settings";
import React, { FC, useMemo, useState } from "react";

import FlussAppBar from "./FlussAppBar";
import FlussContainer from "./FlussContainer";
import FlussDrawer from "./FlussDrawer";

const MainLayout: FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const Children = useMemo(() => () => <>{children}</>, [children]);
  const [sidebarInMobileIsOpen, setSidebarInMobileIsOpen] = useState(false);

  return (
    <MainLayoutContext.Provider
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
        <Settings />
      </div>
    </MainLayoutContext.Provider>
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

export type MainLayoutValues = typeof initValue;
export const MainLayoutContext = React.createContext(initValue);

export default MainLayout;
