import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";
import React, { FC } from "react";
import { connect, StoreProps } from "store";

const Login: FC<StoreProps> = ({ store }) => {
  const classes = useStyles();

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
              labelWidth={70}
            />
          </FormControl>
          <Link className={clsx(classes.margin)} href="#" onClick={preventDefault}>
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
  },
  margin: {
    marginTop: "2rem",
    marginLeft: "5rem",
  },
  textField: {
    width: "40rem",
  },
  button: {
    width: "40rem",
  },
}));

export default connect(Login);
