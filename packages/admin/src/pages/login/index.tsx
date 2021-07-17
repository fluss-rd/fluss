import { yupResolver } from "@hookform/resolvers";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { AxiosResponse } from "axios";
import router from "next/router";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Credentials, useLogin } from "services/auth";
import FormField from "shared/components/FormField";
import * as yup from "yup";

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<Credentials>({ resolver: yupResolver(loginSchema) });
  const classes = useStyles();
  const loginMutation = useLogin();

  // Log In the user in the app
  const onSubmit = (credentials: Credentials) => loginMutation.mutate(credentials);

  // Go to the specified page.
  const goToRecoverPassword = (e: any) => {
    e.preventDefault();
    router.push("forgot-password");
  };

  // Shows login message errors.
  const showError = () => {
    if (!loginMutation.isError) return null;

    const error: AxiosResponse = (loginMutation.error as any).response;
    const message: string = error
      ? error.status === 401
        ? "El usuario o contraseña propcionados no son correctos. Intente nuevamente."
        : error.data.message
      : "Lo sentimos, estamos experimentando un error en nuestros servidores";

    return <Alert severity="error">{message}</Alert>;
  };

  return (
    <>
      <Typography variant="h4" className={classes.title}>
        Inicio de sesión
      </Typography>

      {showError()}

      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="email"
          label="Email"
          placeholder="user@email.com"
          error={!!form.errors.email}
          helperText={form.errors.email?.message}
          inputRef={form.register}
        />

        <FormField
          name="password"
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          placeholder="******"
          helperText={form.errors.password?.message}
          error={form.errors.password ? true : false}
          inputRef={form.register}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Link onClick={goToRecoverPassword} style={{ cursor: "pointer" }}>
          ¿Olvidó su contraseña?
        </Link>
        <br />
        <Button variant="contained" color="primary" size="large" type="submit">
          {!loginMutation.isLoading ? <>Iniciar sesión</> : <CircularProgress color="secondary" />}
        </Button>
      </form>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
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

const loginSchema: yup.SchemaOf<Credentials> = yup.object().shape({
  email: yup
    .string()
    .required("Por favor, introduzca su correo")
    .email("Debe ingresar un correo válido. Ej: usuario@email.com"),
  password: yup.string().required("Por favor, introduzca su contraseña"),
});

export default Login;
