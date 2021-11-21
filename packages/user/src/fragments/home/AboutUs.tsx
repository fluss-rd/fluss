import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import React, { FC } from "react";
import Slider, { Settings } from "react-slick";

const AboutUs: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Slider {...settings}>
        <div>
          <Grid container>
            <Grid item md={5} className={classes.startSide}>
              <Typography
                variant="h4"
                style={{ fontWeight: "bold", lineHeight: theme.spacing(0.18) }}
              >
                Sobre nosotros
              </Typography>

              <Typography variant="h5" style={{ lineHeight: theme.spacing(0.18) }}>
                Somos una organización sin fines de lucro que busca proveer información de elementos
                fisocoquímicos de la República Dominicana y hacer accesible estos datos a todo
                interesado en conocer de ellos.
              </Typography>
            </Grid>
            <Grid item md={7} className={classes.endSide}>
              <div className={classes.imageBox}>
                <Image src="/images/reports.png" alt="Gráficos" layout="fill" objectFit="contain" />
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={{}}>
          <Grid container style={{}}>
            <Grid item md={5} className={classes.startSide}>
              <Typography
                variant="h4"
                style={{ fontWeight: "bold", lineHeight: theme.spacing(0.18) }}
              >
                Nuestro equipo
              </Typography>

              <Typography variant="h5" style={{ lineHeight: theme.spacing(0.18) }}>
                Hecho por un pequeño pero diverso equipo de personas que con sus especialidades
                particulares y gran trabajo en equipo creamos esta plataforma libre y gratuita para
                sus necesidades de investigacion, estudiantiles o simplemente curiosidad.
              </Typography>
            </Grid>
            <Grid item md={7} className={classes.endSide}>
              <div className={classes.imageBox}>
                <Image src="/images/team.png" alt="Gráficos" layout="fill" objectFit="contain" />
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={{}}>
          <Grid container style={{}}>
            <Grid item md={5} className={classes.startSide}>
              <Typography
                variant="h4"
                style={{ fontWeight: "bold", lineHeight: theme.spacing(0.18) }}
              >
                Nuestros patrocinadores
              </Typography>

              <Typography variant="h5" style={{ lineHeight: theme.spacing(0.18) }}>
                Gracias a nuestros patricanodores por el apoyo a nuestor proyecto{" "}
                <strong>INTEC</strong> (Instituto Tecnologico de Santo Domingo){" "}
                <strong>ACAP</strong> (Asociacion del Cibao de Ahorros y Prestamos)
              </Typography>
            </Grid>
            <Grid item md={7} className={classes.endSide}>
              <div className={classes.imageBox}>
                <Image
                  src="/images/sponsors.png"
                  alt="Gráficos"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </Slider>
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
  },
  endSide: {
    display: "flex",
    alignItems: "center",
  },
  imageBox: {
    position: "relative",
    width: "100%",
    minHeight: 300,
    "& > div > div:first-child": {
      borderRadius: 30,
    },
  },
}));

export default AboutUs;
