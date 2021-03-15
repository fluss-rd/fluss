import { Divider, Drawer, Hidden, useTheme } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useContext } from "react";

import { DrawerValues, DrawerValuesContext } from "../index";
import DrawerFoot from "./drawer-foot";
import DrawerItems from "./fluss-drawer-items";

const FlussDrawer: FC = () => {
  const context = useContext(DrawerValuesContext);
  const classes = useStyles(context);
  const theme = useTheme();

  const items = (
    <div className={classes.container}>
      <div className={classes.toolbar} />
      <Divider />
      <DrawerItems />
      <DrawerFoot />
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          ModalProps={{ keepMounted: true }}
          open={context.sidebarInMobileIsOpen}
          onClose={context.closeSidebarInMobile}
          classes={{ paper: classes.drawerPaper }}
        >
          {items}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }} open>
          {items}
        </Drawer>
      </Hidden>
    </nav>
  );
};

const useStyles = makeStyles<Theme, DrawerValues>((theme: Theme) => ({
  drawer: ({ mdUp, drawerWidth }) => ({
    width: mdUp && drawerWidth,
    flexShrink: mdUp && 0,
    backgroundColor: "transparent",
  }),
  container: () => ({
    display: "flex",
    flexDirection: "column",
    height: `100vh`,
    backgroundColor: `${theme.palette.background.default}CC`,
    backdropFilter: `blur(3px)`,
  }),
  toolbar: theme.mixins.toolbar,
  drawerPaper: ({ drawerWidth }) => ({
    width: drawerWidth,
    backgroundImage: `linear-gradient(#FFFFFF, #B7E8FF, #FFBE7D)`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
  }),
  logo: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
  },
}));

export default FlussDrawer;
