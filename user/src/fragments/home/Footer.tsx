import { Button, Container, Grid, Typography } from "@material-ui/core";
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import React, { FC } from "react";
import TextField from "shared/components/FormField";

const Footer = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const classes = useStyles();

  return (
    <div>
      <div>
        <svg
          width="1440"
          height="129"
          viewBox="0 0 1440 129"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1440" height="115" transform="translate(0 14)" fill="#7DB6D1" />
          <path d="M1599 0L0 0L0 79C799.5 0 1599 79 1599 79V0Z" fill="white" />
        </svg>
      </div>
      <div className={classes.footer}>
        <br></br>
        <p>Copyright © 2020, Fluss Inc.</p>
      </div>
      <div className={classes.subfooter}>
        <Grid container direction="row" justify="center" alignItems="center">
          <TextField
            id="outlined-basic"
            placeholder="Correo Electronico"
            label=""
            className={classes.subscribe}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            style={{ fontWeight: "bold" }}
          >
            Suscribete!
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export const useStyles = makeStyles((theme) => ({
  subscribe: {
    justifyContent: "center",
    flexDirection: "row",
    width: "30%",
  },
  button: {
    justifyContent: "center",
    flexDirection: "row",
    width: "20%",
    height: 55,
  },
  subfooter: {
    /* Footer */
    position: "absolute",
    width: 1440,
    height: 60,

    top: 1940,
    textAlign: "center",
    /* Light */
    background: "#3E8BB7",
  },
  footer: {
    /* Rectangle 82 */

    position: "absolute",
    width: 1440,
    height: 120,
    left: 0,
    top: 2000,
    background: "#BEA69A",

    bottom: 0,

    color: "white",
    textAlign: "center",
  },
  container: {
    textAlign: "center",
  },
}));

export default Footer;
