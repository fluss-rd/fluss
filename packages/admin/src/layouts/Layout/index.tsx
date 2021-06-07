import { CssBaseline } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Settings from "fragments/Settings";
//import withAuth from "hoc/withAuth";
import React, { createContext, FC } from "react";
import { useRouter } from "next/router";

import FlussDrawer from "./FlussDrawer";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isInWatershed = router.route === "/watersheds/[id]";
  const classes = useStyles({ isInWatershed });
  //const [value, setValue] = useMergeState()
  // TODO: Make the functions to update the drawerWidth when is closed

  return (
    <LayoutContext.Provider value={initialValue}>
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

const initialValue = { drawerWidth: 240 };

export const LayoutContext = createContext({
  ...initialValue,
});

//export default withAuth(Layout);
export default Layout;

