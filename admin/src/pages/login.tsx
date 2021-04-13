import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
  Grid,
  CssBaseline,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";
import Image from "next/image";
import router from "next/router";
import React, { FC } from "react";
import { connect, StoreProps } from "store";

const Login: FC<StoreProps> = ({ store }) => {
  const classes = useStyles();
  const push = (path: string) => () => router.push(path);
  const emailRegex = new RegExp(
    '^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$'
  );

  const [values, setValues] = React.useState({
    amount: "",
    email: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
    errorTextField: false,
    helperTextField: "",
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    // TODO: add function validate() to call here.
  };

  const handleEmailInputChange = (e) => {
    if (e.target.value === "") {
      setValues({
        ...values,
        email: e.target.value,
        helperTextField: "Este campo no puede estar vacío",
        errorTextField: true,
      });

      return;
    }

    if (!emailRegex.test(e.target.value)) {
      setValues({
        ...values,
        email: e.target.value,
        helperTextField: "Por favor, introducir un email válido",
        errorTextField: true,
      });

      return;
    }

    setValues({
      ...values,
      email: e.target.value,
      helperTextField: "",
      errorTextField: false,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const preventDefault = (event) => event.preventDefault();

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <div className={classes.backgroundContainer}>
          <div className={classes.logoSection}>
            <Image src="/images/logo-login.png" width={250} height={270} />
          </div>
          <img src="/images/river-login.jpg" alt="river" style={{ opacity: 0.8 }} />
        </div>
      </Grid>
      <Grid item xs={12} md={6} className={classes.formSection}>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Inicio de sesion
        </Typography>

        <form noValidate autoComplete="off" className={classes.form}>
          <TextField
            error={values.errorTextField}
            onChange={handleEmailInputChange}
            id="outlined-error-helper-text"
            label="Email"
            placeholder="p. ej. micaela@email.com"
            helperText={values.helperTextField}
            variant="outlined"
          />

          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              placeholder="password"
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={20}
            />
          </FormControl>
          <Link href="/recoverPassword" onClick={push("/recoverPassword")}>
            ¿Olvidó su contraseña?
          </Link>
          <br />
          <Button variant="contained" color="primary" onClick={store.logIn}>
            Iniciar sesión
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    height: "100%",
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
  formSection: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(8),
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

export default connect(Login);

