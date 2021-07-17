import { CssBaseline } from "@material-ui/core";
import { Container, Grid, Hidden } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Image from "next/image";
import React, { FC } from "react";

const LoginLayout: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />

      <Grid container>
        <Hidden smDown>
          <Grid item xs={12} md={6}>
            <div className={classes.backgroundContainer}>
              <div className={classes.logoSection}>
                <Image src="/images/logo-login.png" width={250} height={270} />
              </div>
              <img src="/images/river-login.jpg" alt="river" style={{ opacity: 0.8 }} />
            </div>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6} className={classes.formSection}>
          <Container maxWidth="sm" className={classes.container}>
            <Hidden mdUp implementation="css">
              <div className={classes.imageBox}>
                <Image src="/images/logo-2.png" alt="Gráficos" layout="fill" objectFit="contain" />
              </div>
            </Hidden>
            {children}
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  background: {
    height: "100%",
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  backgroundContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  logoSection: {
    position: "absolute",
    top: "calc(50% - 135px)",
    left: "calc(50% - 125px)",
    zIndex: 1,
  },
  imageBox: {
    position: "relative",
    width: "100%",
    height: 100,
    "& > div > div:first-child": {
      borderRadius: 30,
    },
    marginBottom: theme.spacing(5),
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    width: "100%",
    marginTop: theme.spacing(4),
    flexDirection: "column",
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default LoginLayout;
