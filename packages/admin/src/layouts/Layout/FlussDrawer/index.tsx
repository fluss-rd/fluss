import { createMuiTheme, Divider, Drawer, IconButton, ThemeProvider } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Menu, MenuOpen } from "@material-ui/icons";
import clsx from "clsx";
import { useLayoutContext } from "layouts/Layout/LayoutContext";
import React, { FC } from "react";
import FlussLogo from "shared/components/FlussLogo";
import useMergeState from "shared/hooks/useMergeState";
import theme from "shared/styles/theme";

import { initialValues } from "../../Layout/LayoutContext";
import FlussDrawerBody from "./FlussDrawerBody";
import FlussDrawerFooter from "./FlussDrawerFooter";
import Settings from "./Settings";

interface FlussDrawerProps {}

const FlussDrawer: FC<FlussDrawerProps> = () => {
  const context = useLayoutContext();
  const open = context.values.drawerWidth === initialValues.drawerWidth;
  const classes = useStyles({ drawerWidth: context.values.drawerWidth, open });
  const [settings, setSettings] = useMergeState<{
    isOpen: boolean;
    tab: "notifications" | "account";
  }>({
    isOpen: false,
    tab: "notifications",
  });

  const onCloseDrawer = () => {
    context.values.collapseSideBar();
  };

  const onOpenDrawer = () => {
    context.values.expandSidebar();
  };

  return (
    <>
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
              <FlussDrawerBody
                openSettings={() => setSettings({ isOpen: true, tab: "notifications" })}
              />
            </div>
            <Divider />
            <FlussDrawerFooter
              drawerIsOpen={open}
              openAccount={() => setSettings({ isOpen: true, tab: "account" })}
            />
          </Drawer>
        </div>
      </ThemeProvider>
      <Settings
        open={settings.isOpen}
        view={settings.tab}
        close={() => setSettings({ isOpen: false })}
      />
    </>
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
    //background: theme.palette.primary.main,
    background: "#060913",
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
