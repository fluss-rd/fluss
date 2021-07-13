import { CssBaseline } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import withAuth from "hoc/withAuth";
import { useRouter } from "next/router";
import React, { createContext, FC } from "react";
import { useMergeState } from "shared/hooks";

import FlussDrawer from "./FlussDrawer";
import LayoutContext, { initialValues, LayoutValues } from "./LayoutContext";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const theme = useTheme();
  const isInWatershed = router.route === "/watersheds/[id]" || router.route === "/watersheds";
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

  return (
    <LayoutContext.Provider value={{ values, updateValues }}>
      <div className={classes.root}>
        <CssBaseline />
        <FlussDrawer />
        <main className={classes.content}>{children}</main>
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

//export default withAuth(Layout);
export default Layout;

