import { Button, Container, Grid, Typography } from "@material-ui/core";
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import React, { FC } from "react";
import FormField from "shared/components/FormField";

interface ContactProps {}

const Contact: FC<ContactProps> = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container>
        <Grid item md={5} className={classes.startSide}>
          <div className={classes.imageBox}>
            <Image src="/images/letter.png" alt="Gráficos" layout="fill" objectFit="contain" />
          </div>

          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Contacto
          </Typography>

          <Typography variant="h5" style={{ lineHeight: theme.spacing(0.18) }}>
            Si tienes <span style={{ fontWeight: "bold" }}>preguntas</span> o simplemente deseas{" "}
            <span style={{ fontWeight: "bold" }}>ponerte en contacto</span>, utiliza el formulario a
            continuación.{" "}
            <span style={{ fontWeight: "bold" }}>Esperamos con interés escuchar de ti</span>
          </Typography>
        </Grid>
        <Grid item md={7} className={classes.endSide}>
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
  );
};

export const useStyles = makeStyles((theme) => {
  const radius = `${theme.shape.borderRadius}px`;
  return {
    container: {
      textAlign: "center",
      padding: theme.spacing(4),
    },
    startSide: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(10),
      background: theme.palette.grey[50],
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
      borderRadius: `0px ${radius} ${radius} 0px`,
      [theme.breakpoints.down("sm")]: {
        borderRadius: `0px 0px ${radius} ${radius}`,
      },
    },
    imageBox: {
      position: "relative",
      width: "100%",
      height: 200,
      "& > div > div:first-child": {
        borderRadius: 30,
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
