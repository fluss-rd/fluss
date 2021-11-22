import { Container, Grid, Typography, Hidden, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import React, { FC } from "react";
import Slider, { Settings } from "react-slick";
import HomeSection from "./HomeSection";

const AboutUs: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isInSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
    arrows: !isInSmallDevice,
  };

  return (
    <HomeSection name="about-us" className={classes.background}>
      <Container maxWidth="lg" className={classes.container}>
        <Slider {...settings}>
          <Section
            title="Sobre nosotros"
            imageUrl="/images/reports.png"
            description="Somos una organización sin fines de lucro que busca proveer información de elementos fisocoquímicos de la República Dominicana y hacer accesible estos datos a todo interesado en conocer de ellos."
          />
          <Section
            title="Nuestro equipo"
            imageUrl="/images/team.png"
            description="Hecho por un pequeño pero diverso equipo de personas que con sus especialidades particulares y gran trabajo en equipo creamos esta plataforma libre y gratuita para sus necesidades de investigacion, estudiantiles o simplemente curiosidad."
          />
          <Section
            title="Nuestros patrocinadores"
            imageUrl="/images/team.png"
            description={
              <>
                Gracias a nuestros patricanodores por el apoyo a nuestor proyecto{" "}
                <strong>INTEC</strong> (Instituto Tecnologico de Santo Domingo){" "}
                <strong>ACAP</strong> (Asociacion del Cibao de Ahorros y Prestamos)
              </>
            }
          />
        </Slider>
      </Container>
    </HomeSection>
  );
};

interface SectionProps {
  title: string;
  description: string | JSX.Element;
  imageUrl: string;
}

const Section: FC<SectionProps> = ({ title, description, imageUrl }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={5} className={classes.startSide}>
          <Typography variant="h4" style={{ fontWeight: "bold", lineHeight: theme.spacing(0.18) }}>
            {title}
          </Typography>

          <br />

          <Typography variant="h5" style={{ lineHeight: theme.spacing(0.18) }}>
            {description}
          </Typography>
        </Grid>
        <Hidden smDown>
          <Grid item md={7} className={classes.endSide}>
            <div className={classes.imageBox}>
              <Image src={imageUrl} alt="Gráficos" layout="fill" objectFit="contain" />
            </div>
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

export const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: "linear-gradient(rgba(233, 250, 254, 1), rgba(255, 255, 255, 0))",
  },
  container: {
  },
  startSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
    minHeight: 300,
    "& > div > div:first-child": {
      borderRadius: 30,
    },
  },
}));

export default AboutUs;

