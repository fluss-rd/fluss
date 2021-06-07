import { createMuiTheme, Divider, Drawer, IconButton, ThemeProvider } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { Menu, MenuOpen } from "@material-ui/icons";
import clsx from "clsx";
import React, { FC } from "react";
import FlussLogo from "shared/components/FlussLogo";
import theme from "shared/styles/theme";
import useBoolean from "hooks/useBoolean";

import FlussDrawerBody from "./FlussDrawerBody";
import FlussDrawerFooter from "./FlussDrawerFooter";
import useLayoutContext from "hooks/useLayoutContext";
import { initialValues } from ".";

interface FlussDrawerProps {}

const FlussDrawer: FC<FlussDrawerProps> = () => {
  const [open, openDrawer, closeDrawer] = useBoolean(true);
  const context = useLayoutContext();
  const classes = useStyles({ drawerWidth: context.values.drawerWidth, open });
  const theme = useTheme();

  const onCloseDrawer = () => {
    closeDrawer();
    context.updateValues({ drawerWidth: theme.spacing(9) + 1 });
  };

  const onOpenDrawer = () => {
    openDrawer();
    context.updateValues({ drawerWidth: initialValues.drawerWidth });
  };

  return (
    <ThemeProvider theme={drawerTheme}>
      <div>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
              [classes.paper]: true,
            }),
          }}
        >
          <div className={classes.toolbar}>
            {open ? (
              <>
                <FlussLogo imagePath="/images/logo_image_dark.png" />
                <IconButton onClick={onCloseDrawer} style={{ color: "#ffffff" }}>
                  <MenuOpen />
                </IconButton>
              </>
            ) : (
              <IconButton onClick={onOpenDrawer}>
                <Menu />
              </IconButton>
            )}
          </div>
          <Divider />
          <div className={classes.drawerBody}>
            <FlussDrawerBody />
          </div>
          <Divider />
          <FlussDrawerFooter drawerIsOpen={open} />
        </Drawer>
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles<Theme, { drawerWidth: number; open: boolean }>((theme) => ({
  drawerBody: {
    flex: 1,
  },
  drawerOpen: {
    width: ({ drawerWidth }) => drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: ({ open }) => (open ? "flex-end" : "center"),
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  paper: {
    background: theme.palette.primary.main,
    color: "white",
  },
}));

const drawerTheme = createMuiTheme({
  ...theme,
  palette: {
    type: "dark",
  },
});

export default FlussDrawer;

