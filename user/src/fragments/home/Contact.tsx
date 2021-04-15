import { Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import React, { FC } from "react";
import FormField from "shared/components/FormField";

interface ContactProps {}

const Contact: FC<ContactProps> = (props) => {
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
            Si tienes preguntas o simplemente deseas ponerte en contacto, utiliza el formulario a
            continuación. Esperamos con interés escuchar de ti.
          </Typography>
        </Grid>
        <Grid item md={7} className={classes.endSide}>
          <form className={classes.form}>
            <FormField label="Email" name="email" />
            <FormField label="Nombre" name="name" />
            <FormField multiline label="Comentario" name="comment" rows={10} />
            <br />
            <Button fullWidth variant="contained" color="primary" size="medium">
              Enviar
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.secondary.light,
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
    background: theme.palette.grey[50],
    borderRadius: theme.shape.borderRadius,
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
}));

export default Contact;
