import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  Hidden,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC } from "react";
import HomeSection from "./HomeSection";

const Welcome: FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const primary = theme.palette.primary.main;
  const classes = useStyles();
  const goToDataAndReports = () => router.push("/monitor");

  return (
    <HomeSection name="welcome">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} md={6} className={classes.startSide}>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", lineHeight: theme.spacing(0.18) }}
            >
              Te damos la bienvenida a la aplicación de{" "}
              <span style={{ color: primary }}>monitoreo de ríos</span> de la Republica Dominicana
            </Typography>

            <Typography variant="h5" style={{ lineHeight: theme.spacing(0.18) }}>
              En el monitor de ríos <span style={{ color: primary }}>fluss</span>, podrás encontrar
              datos de parámetros fisicoquímicos del agua de los ríos de la República Dominicana
            </Typography>

            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ fontWeight: "bold" }}
                onClick={goToDataAndReports}
              >
                Ir al monitor
              </Button>
            </div>
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={6} className={classes.endSide}>
              <div className={classes.imageBox}>
                <Image src="/images/welcome.png" alt="Hey" layout="fill" objectFit="contain" />
              </div>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </HomeSection>
  );
};

export const useStyles = makeStyles((theme) => ({
  startSide: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
  endSide: {
    display: "flex",
    alignItems: "center",
  },
  imageBox: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
}));

export default Welcome;

