import { Button, Grid, Typography } from "@material-ui/core";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import clsx from "clsx";
import Image from "next/image";
import React, { FC } from "react";
import TextField from "shared/components/FormField";

const Footer = () => {
  const { root, curved, secondLevel, suscription, contact, footer, ...styles } = useStyles();

  return (
    <div className={root}>
      <div className={curved}>
        <Image src="/images/logo-2.png" width={100} height={110} />
      </div>
      <Grid container className={secondLevel}>
        <Grid item xs={12} md={6}>
          <div className={clsx(styles.center, suscription)}>
            <div>
              <CssTextField
                id="outlined-basic"
                placeholder="Correo Electronico"
                label=""
                size="small"
                InputProps={{ classes: { root: styles.whiteTextField } }}
              />
            </div>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              style={{ fontWeight: "bold" }}
            >
              Suscribete!
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={clsx(styles.center, contact)}>
          <Typography variant="body1">
            <strong>Contacto</strong>
          </Typography>

          <br />

          <EmailIcon />
          <Typography variant="caption">fluss.contact@gmail.com</Typography>
        </Grid>
      </Grid>
      <div className={clsx(styles.center, footer)}>
        <br></br>
        <p>Copyright © 2020, Fluss Inc.</p>
      </div>
    </div>
  );
};

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "calc(100vh/3)",
    display: "flex",
    flexFlow: "column",
    textAlign: "center",
  },
  curved: {
    borderRadius: "80% 80% 0 0",
    background: theme.palette.secondary.main,
    minHeight: 100,
    padding: theme.spacing(2),
  },
  secondLevel: {
    background: lighten(theme.palette.primary.main, 0.2),
    padding: theme.spacing(6),
  },
  contact: {
    flexDirection: "column",
    height: "100%",
    color: theme.palette.common.white,
  },
  suscription: {
    height: "100%",
    padding: theme.spacing(2),
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
  footer: {
    width: "100%",
    background: "#BEA69A",
    color: "white",
    textAlign: "center",
  },
  whiteTextField: {
    color: "white",
    borderColor: "white",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const textFieldConfig = {
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
        color: "white",
      },
    },
  },
};

const CssTextField = withStyles(textFieldConfig)(TextField);

export default Footer;
