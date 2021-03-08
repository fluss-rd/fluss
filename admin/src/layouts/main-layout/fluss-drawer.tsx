import { Drawer, Hidden } from "@material-ui/core";
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import React, { FC, useContext } from "react";

import DrawerItems from "./fluss-drawer-items";
import { MainLayoutContext } from "./index";

interface FlussDrawerProps {
  window?: () => Window;
}

const FlussDrawer: FC<FlussDrawerProps> = ({ window }) => {
  const { drawerWidth } = useContext(MainLayoutContext);
  const classes = useStyles({ drawerWidth });
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerItems />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <DrawerItems />
        </Drawer>
      </Hidden>
    </nav>
  );
};

interface StyleProps {
  drawerWidth: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: ({ drawerWidth }) => drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: ({ drawerWidth }) => drawerWidth,
    },
  })
);

export default FlussDrawer;
