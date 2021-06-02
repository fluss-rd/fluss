import {
  IconButton,
  Button,
  Drawer,
  Divider,
  createMuiTheme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Menu, MenuOpen, AccountCircle, ArrowDropDown } from "@material-ui/icons";
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
  const className = clsx(classes.drawer, {
    [classes.drawerOpen]: open,
    [classes.drawerClose]: !open,
  });
  const drawerClasses = {
    paper: clsx({
      [classes.drawerOpen]: open,
      [classes.drawerClose]: !open,
      [classes.paper]: true,
    }),
  };

  return (
    <ThemeProvider theme={drawerTheme}>
      <div>
        <Drawer variant="permanent" className={className} classes={drawerClasses}>
          <div className={classes.toolbar}>
            {open ? (
              <>
                <FlussLogo imagePath="/images/logo_image_dark.png" />
                <IconButton onClick={closeDrawer} style={{ color: "#ffffff" }}>
                  <MenuOpen />
                </IconButton>
              </>
            ) : (
              <IconButton onClick={openDrawer}>
                <Menu />
              </IconButton>
            )}
          </div>
          <Divider />
          <div className={classes.drawerBody}>{props.children}</div>
          <Divider />
          <div className={clsx(classes.drawerFooter)}>
            {open && (
              <Typography variant="body1" style={{ flex: 1, alignSelf: "center" }}>
                Mikhael Santos
              </Typography>
            )}
            <Button size="small" className={classes.options}>
              <AccountCircle />
              <ArrowDropDown />
            </Button>
          </div>
        </Drawer>
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles<Theme, { drawerWidth: number; open: boolean }>((theme) => ({
  drawer: {
    width: ({ drawerWidth }) => drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerBody: {
    flex: 1,
  },
  drawerFooter: ({ open }) => ({
    paddingTop: theme.spacing(1.5),
    paddingLeft: open ? theme.spacing(2) : 0,
    paddingRight: open ? theme.spacing(1) : 0,
    paddingBottom: theme.spacing(1.5),
    display: "flex",
    justifyContent: "center",
  }),
  options: {
    "&:hover": {
      background: "none",
    },
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

