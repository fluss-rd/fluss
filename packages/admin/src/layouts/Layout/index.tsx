import { CssBaseline, useMediaQuery, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import withAuth from "hoc/withAuth";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useMergeState } from "shared/hooks";
import theme from "styles/theme";

import FlussDrawer from "./FlussDrawer";
import LayoutContext, { initialValues, LayoutValues } from "./LayoutContext";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const isInWatershed = router.route === "/watersheds/[id]";
  const isInHome = router.route === "/";
  const classes = useStyles({ isInWatershed, isInHome });

  const [values, setValue] = useMergeState({
    ...initialValues,
    pagePadding: theme.spacing(3),
    sidebarIsOpen: () => values.drawerWidth === initialValues.drawerWidth,
    expandSidebar: () => {
      setValue({ drawerWidth: initialValues.drawerWidth });
    },
    collapseSideBar: () => {
      setValue({ drawerWidth: theme.spacing(9) + 1 });
    },
  });

  const updateValues = (newValues: LayoutValues) => {
    setValue({ ...newValues });
  };

  useEffect(collapseSidebarOnMediumDevice, [isDownMd]);
  useEffect(expandSidebarUpLarge, [isUpMd]);

  function collapseSidebarOnMediumDevice() {
    if (isDownMd) values.collapseSideBar();
  }

  function expandSidebarUpLarge() {
    if (isUpMd) values.expandSidebar();
  }

  const isInMonitor = router.pathname === "/";
  const isInLoginOrRecoverPassword =
    router.pathname === "/login" || router.pathname === "/forgot-password";
  const currentTheme = isInMonitor || isInLoginOrRecoverPassword ? monitorTheme : theme;

  return (
    <LayoutContext.Provider value={{ values, updateValues }}>
      <div className={classes.root}>
        <CssBaseline />
        <FlussDrawer />
        <ThemeProvider theme={currentTheme}>
          <main className={classes.content}>{children}</main>
        </ThemeProvider>
      </div>
    </LayoutContext.Provider>
  );
};

const useStyles = makeStyles<Theme, { isInWatershed: boolean; isInHome: boolean }>(
  (theme: Theme) => ({
    root: {
      display: "flex",
      minHeight: "100vh",
    },
    content: {
      flexGrow: 1,
      padding: ({ isInWatershed, isInHome }) => (isInWatershed || isInHome ? 0 : theme.spacing(3)),
    },
  })
);

const monitorTheme = createMuiTheme({
  ...theme,
  palette: {
    type: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#7db6d1",
    },
  },
});
export default withAuth(Layout);

