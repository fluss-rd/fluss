import { CssBaseline } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import withAuth from "hoc/withAuth";
import { useRouter } from "next/router";
import React, { createContext, FC } from "react";
import { useMergeState } from "shared/hooks";

import FlussDrawer from "./FlussDrawer";
import LayoutContext, { initialValues, LayoutValues } from "./LayoutContext";

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

//export default withAuth(Layout);
export default Layout;
