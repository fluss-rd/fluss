import { CssBaseline } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Settings from "fragments/Settings";
import { useRouter } from "next/router";
import withAuth from "hoc/withAuth";
import React, { createContext, FC } from "react";
import { useMergeState } from "shared/hooks";

import FlussDrawer from "./FlussDrawer";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isInWatershed = router.route === "/watersheds/[id]";
  const classes = useStyles({ isInWatershed });
  const [values, setValue] = useMergeState({ ...initialValues });

  const updateValues = (newValues: LayoutValues) => {
    setValue({ ...newValues });
  };

  return (
    <LayoutContext.Provider value={{ values, updateValues }}>
      <div className={classes.root}>
        <CssBaseline />
        <FlussDrawer />
        <main className={classes.content}>{children}</main>
        <Settings />
      </div>
    </LayoutContext.Provider>
  );
};

const useStyles = makeStyles<Theme, { isInWatershed: boolean }>((theme: Theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    padding: ({ isInWatershed }) => (isInWatershed ? 0 : theme.spacing(3)),
  },
}));

export const initialValues: LayoutValues = { drawerWidth: 240 };

export const LayoutContext = createContext<LayoutContextValue>({
  values: initialValues,
  updateValues: () => {},
});

export type LayoutContextValue = {
  values: LayoutValues;
  updateValues: (newValues: LayoutValues) => void;
};

export type LayoutValues = { drawerWidth: number };

//export default withAuth(Layout);
export default Layout;
