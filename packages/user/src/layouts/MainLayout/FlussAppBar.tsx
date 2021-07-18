import theme from "shared/styles/theme";
import {
  AppBar as Navbar,
  Button,
  Divider,
  Toolbar,
  Typography,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { appBarHeight, push, scroll } from "shared/helpers";

const FlussAppBar: FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isInMonitor = router.pathname === "/monitor";
  const classes = useStyles({ isInMonitor });
  const goTo = (sectionId: string) => {
    return () => {
      if (router.pathname !== "/") router.push({ pathname: "/", query: { sectionId } });
      else scroll(sectionId, { offset: -appBarHeight(theme) })();
    };
  };

  const navbar = (
    <Navbar position="fixed" color="transparent" elevation={0} className={classes.navbar}>
      <Toolbar>
        <Button className={classes.brand} onClick={push("/")}>
          <div className={classes.logo}>
            <Image src="/images/logo.png" alt="Logo" width={35} height={35} />
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            fluss
          </Typography>
        </Button>
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
          <Button onClick={goTo("welcome")}>
            Inicio
          </Button>
          <Button onClick={goTo("about-us")}>
            ¿Quiénes somos?
          </Button>
          <Button onClick={goTo("contact")}>
            Contacto
          </Button>
        </div>
      </Toolbar>
      <Divider />
    </Navbar>
  );

  if (isInMonitor) return <ThemeProvider theme={drawerTheme}>{navbar}</ThemeProvider>;
  return navbar;
};

const drawerTheme = createMuiTheme({
  ...theme,
  palette: {
    type: "dark",
    primary: {
      main: "#FFFFFF",
    },
  },
});

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
    display: "none",
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.primary.main,
    cursor: "pointer",
    textTransform: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
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
    backgroundColor: ({ isInMonitor }) =>
      isInMonitor ? "#060913CC" : `${theme.palette.background.default}CC`,
    backdropFilter: `blur(4px)`,
  },
}));

export default FlussAppBar;

