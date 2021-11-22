import {
  AppBar as Navbar,
  Link,
  Button,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { appBarHeight, scroll } from "shared/helpers";
import useBoolean from "shared/hooks/useBoolean";

import FlussDrawer from "./FlussDrawer";

const FlussAppBar: FC = () => {
  const [sidebarIsOpen, openSidebar, closeSidebar] = useBoolean();
  const theme = useTheme();
  const usesDarkTheme = theme.palette.type === "dark";
  const isMediumSizeDevice = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const isInMonitor = router.pathname === "/monitor";
  const classes = useStyles({ isInMonitor });
  const push = (path: string) => () => router.push(path);
  const goTo = (sectionId: string) => {
    return () => {
      if (router.pathname !== "/") router.push({ pathname: "/", query: { sectionId } });
      else scroll(sectionId, { offset: -appBarHeight(theme) })();
    };
  };

  return (
    <>
      <FlussDrawer close={closeSidebar} isOpen={sidebarIsOpen} goTo={goTo} />
      <Navbar position="fixed" color="transparent" elevation={0} className={classes.navbar} variant="outlined">
        <Toolbar>
          {!isMediumSizeDevice && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={openSidebar}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Button className={classes.brand} onClick={push("/")}>
            <div className={classes.logo}>
              {!usesDarkTheme ? (
                <Image src="/images/logo.png" alt="Logo" width={35} height={35} />
              ) : (
                <Image src="/images/logo_image_dark.png" alt="Logo" width={35} height={35} />
              )}
            </div>
            <Typography className={classes.title} variant="h6" noWrap>
              fluss
            </Typography>
          </Button>
          {isMediumSizeDevice && (
            <>
              <div className={classes.startButtons}>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.reportsButton}
                  onClick={push("/monitor")}
                >
                  Monitor
                </Button>
              </div>
              <div className={classes.endButtons}>
                <Button onClick={goTo("welcome")}>Inicio</Button>
                <Button onClick={goTo("about-us")}>¿Quiénes somos?</Button>
                <Button onClick={goTo("contact")}>Contacto</Button>
                <Button>
                  <Link
                    href="https://fluss-help.vercel.app/faq"
                    target="_blank"
                    color="textPrimary"
                  >
                    Ayuda
                  </Link>
                </Button>
              </div>
            </>
          )}
        </Toolbar>
      </Navbar>
    </>
  );
};

const useStyles = makeStyles<Theme, { isInMonitor: boolean }>((theme: Theme) => ({
  brand: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginRight: theme.spacing(3),
    padding: 0,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "block",
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.primary.main,
    cursor: "pointer",
    textTransform: "none",
  },
  startButtons: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  reportsButton: {
    borderRadius: 10,
  },
  endButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(3),
    },
  },
  navbar: {
    backgroundColor: `${theme.palette.background.default}CC`,
    backdropFilter: `blur(4px)`,
  },
}));

export default FlussAppBar;

