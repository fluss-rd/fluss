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
    <div>
      <div className={classes.logo}>
        <Image src="/images/logo-login.png" width={250} height={270}></Image>
      </div>

      <div>
        <img src="/images/river-login.jpg" className={classes.wallpaper} alt="river"></img>
      </div>

      <Typography className={clsx(classes.text)}>Inicio de sesion </Typography>

      <form noValidate autoComplete="off">
        <div className={clsx(classes.container)}>
          <TextField
            className={clsx(classes.margin, classes.textField)}
            error={values.errorTextField}
            onChange={handleEmailInputChange}
            id="outlined-error-helper-text"
            label="Email"
            placeholder="p. ej. micaela@email.com"
            helperText={values.helperTextField}
            variant="outlined"
          />

          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
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
          <Link
            className={clsx(classes.margin)}
            href="/recoverPassword"
            onClick={push("/recoverPassword")}
          >
            ¿Olvidó su contraseña?
          </Link>
          <Button
            className={clsx(classes.margin, classes.button)}
            variant="contained"
            color="primary"
            onClick={store.logIn}
          >
            Iniciar sesión
          </Button>
        </div>
      </form>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "absolute",
    marginTop: "12rem",
  },
  margin: {
    marginTop: "1rem",
    marginLeft: "48rem",
  },
  textField: {
    width: "30rem",
  },
  button: {
    width: "30rem",
    marginTop: "3rem",
  },

  logo: {
    position: "absolute",
    marginTop: "10rem",
    marginLeft: "12rem",
  },

  wallpaper: {
    position: "absolute",
    opacity: "50%",
    width: "50vw",
    height: "103.6vh",
    marginTop: "-2rem",
    zIndex: -1,
  },

  text: {
    fontSize: "35px",
    position: "absolute",
    marginLeft: "55rem",
    marginTop: "8rem",
  },
}));

export default connect(Login);
