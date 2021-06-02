import { IconButton, Drawer, Divider, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { ChevronLeft, ChevronRight, Menu, MenuOpen } from "@material-ui/icons";
import React, { FC, useContext, useState } from "react";
import { LayoutContext } from ".";
import clsx from "clsx";
import FlussLogo from "shared/components/FlussLogo";
import theme from "shared/styles/theme";

interface FlussDrawerProps {}

const FlussDrawer: FC<FlussDrawerProps> = (props) => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const context = useContext(LayoutContext);
  const classes = useStyles({ drawerWidth: context.drawerWidth, open });
  const theme = useTheme();

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
                <IconButton onClick={closeDrawer} style={{ color: "#ffffff" }}>
                  {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
              </>
            ) : (
              <IconButton onClick={openDrawer}>
                <Menu />
              </IconButton>
            )}
          </div>
          <Divider />
          {props.children}
        </Drawer>
      </div>
    </ThemeProvider>
  );
};

const drawerTheme = createMuiTheme({
  ...theme,
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles<Theme, { drawerWidth: number; open: boolean }>((theme) => ({
  drawer: {
    width: ({ drawerWidth }) => drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
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

export default FlussDrawer;

