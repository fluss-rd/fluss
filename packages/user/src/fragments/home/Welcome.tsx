import { Button, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC } from "react";

const Welcome: FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const primary = theme.palette.primary.main;
  const classes = useStyles();

  const goToDataAndReports = () => router.push("/monitor");

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container>
        <Grid item md={6} className={classes.startSide}>
          <Typography variant="h4" style={{ fontWeight: "bold", lineHeight: theme.spacing(0.18) }}>
            Te damos la bienvenida a la aplicación de{" "}
            <span style={{ color: primary }}>monitoreo de ríos</span> de la Republica Dominicana
          </Typography>

          <Typography variant="h5" style={{ lineHeight: theme.spacing(0.18) }}>
            En el monitor de ríos <span style={{ color: primary }}>fluss</span>, podrás encontrar
            datos de parámetros fisicoquímicos del agua de los ríos de la República Dominicana
          </Typography>

          <Button
            variant="contained"
            color="primary"
            style={{ fontWeight: "bold" }}
            onClick={goToDataAndReports}
          >Ir al monitor</Button>
        </Grid>
        <Grid item md={6} className={classes.endSide}>
          <div className={classes.imageBox}>
            <Image src="/images/welcome.png" alt="Hey" layout="fill" objectFit="contain" />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  startSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(3),
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
