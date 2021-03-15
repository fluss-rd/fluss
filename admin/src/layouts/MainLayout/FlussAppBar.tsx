import { AppBar as Navbar, Divider, IconButton, Toolbar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import React, { FC, useContext } from "react";

import FlussLogo from "../../components/FlussLogo";
import { MainLayoutContext, MainLayoutValues } from ".";

const FlussAppBar: FC = () => {
  const context = useContext(MainLayoutContext);
  const classes = useStyles(context);

  return (
    <>
      <div className={classes.brand}>
        <If condition={!context.mdUp}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={classes.openIcon}
            onClick={context.toggleMobileSidebar}
          >
            <Menu />
          </IconButton>
        </If>

        <FlussLogo />
      </div>
      <Navbar position="fixed" color="transparent" elevation={0} className={classes.appBar}>
        <If condition={!context.mdUp}>
          <Toolbar className={classes.endButtons}></Toolbar>
          <Divider />
        </If>
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
      zIndex: theme.zIndex.modal + 1,
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
