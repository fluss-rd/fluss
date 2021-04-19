import { Divider, Drawer, Hidden, useTheme } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useContext } from "react";

import FlussDrawerFoot from "./FlussDrawerFoot";
import DrawerItems from "./FlussDrawerItems";
import { MainLayoutContext, MainLayoutValues } from "./index";

const FlussDrawer: FC = () => {
  const context = useContext(MainLayoutContext);
  const classes = useStyles(context);
  const theme = useTheme();

  const items = (
    <div className={classes.container}>
      <div className={classes.toolbar} />
      <Divider />
      <DrawerItems />
      <FlussDrawerFoot />
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

const useStyles = makeStyles<Theme, MainLayoutValues>((theme: Theme) => ({
  drawer: ({ mdUp, drawerWidth }) => ({
    width: mdUp && drawerWidth,
    flexShrink: mdUp && 0,
    backgroundColor: "transparent",
  }),
  container: {
    display: "flex",
    flexDirection: "column",
    height: `100vh`,
    backgroundColor: `${theme.palette.background.default}CC`,
    backdropFilter: `blur(3px)`,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: ({ drawerWidth }) => drawerWidth,
    backgroundImage: `linear-gradient(#FFFFFF, #B7E8FF, #FFBE7D)`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
  },
}));

export default FlussDrawer;

