import { Drawer } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useContext } from "react";

import { MainLayoutContext } from "../index";
import DrawerItems from "./fluss-drawer-items";

interface StyleProps {
  drawerWidth: number;
}

const FlussDrawer: FC = () => {
  const { drawerWidth } = useContext(MainLayoutContext);
  const classes = useStyles({ drawerWidth });

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        <DrawerItems />
      </Drawer>
    </nav>
  );
};

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: ({ drawerWidth }) => drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: ({ drawerWidth }) => drawerWidth,
  },
}));

export default FlussDrawer;
