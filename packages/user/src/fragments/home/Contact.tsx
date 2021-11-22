import { Button, Container, Grid, Typography } from "@material-ui/core";
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import React, { FC } from "react";
import FormField from "shared/components/FormField";
import HomeSection from "./HomeSection";

interface ContactProps {}

const Contact: FC<ContactProps> = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <HomeSection name="contact" className={classes.section}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={5} className={classes.startSide}>
            <div className={classes.imageBox}>
              <Image src="/images/letter.png" alt="Gráficos" layout="fill" objectFit="contain" />
            </div>

            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Contacto
            </Typography>

            <Typography variant="h5" style={{ lineHeight: theme.spacing(0.18) }}>
              Si tienes <span style={{ fontWeight: "bold" }}>preguntas</span> o simplemente deseas{" "}
              <span style={{ fontWeight: "bold" }}>ponerte en contacto</span>, utiliza el formulario
              a continuación.{" "}
              <span style={{ fontWeight: "bold" }}>Esperamos con interés escuchar de ti</span>
            </Typography>

            <Typography variant="caption">
              <strong>Correo:</strong>{" "}
              <a href="mailto:fluss.contact@gmail.com">fluss.contact@gmail.com</a>
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} className={classes.endSide}>
            <form className={classes.form}>
              <FormField label="Email" name="email" />
              <FormField label="Nombre" name="name" />
              <FormField multiline label="Comentario" name="comment" rows={10} />
              <br />
              <Button fullWidth variant="contained" color="primary" size="large">
                Enviar
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </HomeSection>
  );
};

export const useStyles = makeStyles((theme) => {
  const radius = `${theme.shape.borderRadius}px`;
  return {
    section: {
      minHeight: "calc(100vh / 1.2)",
      background: theme.palette.grey[50],
    },
    container: {
      textAlign: "center",
    },
    startSide: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& > *:not(:last-child)": {
        marginBottom: theme.spacing(3),
      },
    },
    endSide: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
      backgroundColor: lighten(theme.palette.secondary.main, 0.8),
      width: "100%",
      borderRadius: radius,
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(4),
        background: theme.palette.grey[50],
        padding: 0,
      },
    },
    imageBox: {
      position: "relative",
      width: "100%",
      height: 180,
      "& > div > div:first-child": {
        borderRadius: 30,
      },
      [theme.breakpoints.down("md")]: {
        height: 100,
      },
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      "& > *:not(:last-child)": {
        marginBottom: theme.spacing(2),
      },
    },
  };
});

export default Contact;

