import { AppBar as Navbar, Divider, IconButton, Toolbar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import FlussLogo from "components/FlussLogo";
import React, { FC, useContext } from "react";

import { MainLayoutContext, MainLayoutValues } from ".";

const FlussAppBar: FC = () => {
  const context = useContext(MainLayoutContext);
  const classes = useStyles(context);

  return (
    <>
      <div className={classes.brand}>
        {!context.mdUp && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={classes.openIcon}
            onClick={context.toggleMobileSidebar}
          >
            <Menu />
          </IconButton>
        )}

        <FlussLogo />
      </div>
      <Navbar position="fixed" color="transparent" elevation={0} className={classes.appBar}>
        {!context.mdUp && (
          <>
            <Toolbar className={classes.endButtons}></Toolbar>
            <Divider />
          </>
        )}
      </Navbar>
    </>
  );
};

const useStyles = makeStyles<Theme, MainLayoutValues>((theme: Theme) =>
  createStyles({
    brand: {
      position: "fixed",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      padding: 0,
      textAlign: "left",
      paddingLeft: theme.spacing(2),
      width: ({ drawerWidth }) => drawerWidth,
      zIndex: ({ sidebarInMobileIsOpen }) =>
        sidebarInMobileIsOpen ? theme.zIndex.modal + 1 : theme.zIndex.drawer + 1,
      ...theme.mixins.toolbar,
    },
    appBar: ({ mdUp }) => ({
      backgroundColor: !mdUp && `${theme.palette.background.default}CC`,
      backdropFilter: !mdUp && `blur(3px)`,
      display: "flex",
    }),
    endButtons: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      flexGrow: 1,
      "& > *:not(:last-child)": {
        marginRight: theme.spacing(3),
      },
      height: "100%",
    },
    toggleIcon: {
      marginRight: theme.spacing(1),
    },
    toolbar: theme.mixins.toolbar,
  })
);

export default FlussAppBar;
