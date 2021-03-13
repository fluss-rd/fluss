import { Divider, Drawer } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useContext } from "react";

import { MainLayoutContext } from "../index";
import DrawerFoot from "./drawer-foot";
import DrawerItems from "./fluss-drawer-items";
import FlussLogo from "./fluss-logo";

interface StyleProps {
  drawerWidth: number;
}

const FlussDrawer: FC = () => {
  const { drawerWidth } = useContext(MainLayoutContext);
  const classes = useStyles({ drawerWidth });

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
        <div className={classes.container}>
          <div className={classes.logo}>
            <FlussLogo />
            <Divider />
          </div>
          <DrawerItems />
          <DrawerFoot />
        </div>
      </Drawer>
    </nav>
  );
};

const useStyles = makeStyles<Theme, StyleProps>(({ palette, spacing }: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  drawer: {
    width: ({ drawerWidth }) => drawerWidth,
    display: "flex",
    height: "100vh",
    backgroundImage: `linear-gradient(#FFFFFF, #B7E8FF, #FFBE7D)`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
  },
  drawerPaper: {
    width: ({ drawerWidth }) => drawerWidth,
    backgroundColor: `${palette.background.default}CC`,
    backdropFilter: `blur(3px)`,
  },
  logo: {},
}));

export default FlussDrawer;
