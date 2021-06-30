import { yupResolver } from "@hookform/resolvers";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { AxiosResponse } from "axios";
import Image from "next/image";
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
  const goToRecoverPassword = () => router.push("/recuperar-contraseña");

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
    <Grid container>
      <Hidden smDown>
        <Grid item xs={12} md={6}>
          <div className={classes.backgroundContainer}>
            <div className={classes.logoSection}>
              <Image src="/images/logo-login.png" width={250} height={270} />
            </div>
            <img src="/images/river-login.jpg" alt="river" style={{ opacity: 0.8 }} />
          </div>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={6} className={classes.formSection}>
        <Container maxWidth="sm" className={classes.container}>
          <Hidden mdUp implementation="css">
            <div className={classes.imageBox}>
              <Image src="/images/logo-2.png" alt="Gráficos" layout="fill" objectFit="contain" />
            </div>
          </Hidden>
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

            <Link href="/recoverPassword" onClick={goToRecoverPassword}>
              ¿Olvidó su contraseña?
            </Link>
            <br />
            <Button variant="contained" color="primary" size="large" type="submit">
              {!loginMutation.isLoading ? (
                <>Iniciar sesión</>
              ) : (
                <CircularProgress color="secondary" />
              )}
            </Button>
          </form>
        </Container>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  background: {
    height: "100%",
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
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
  imageBox: {
    position: "relative",
    width: "100%",
    height: 100,
    "& > div > div:first-child": {
      borderRadius: 30,
    },
    marginBottom: theme.spacing(5),
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
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

const loginSchema: yup.SchemaOf<Credentials> = yup.object().shape({
  email: yup
    .string()
    .required("Por favor, introduzca su correo")
    .email("Debe ingresar un correo válido. Ej: usuario@email.com"),
  password: yup.string().required("Por favor, introduzca su contraseña"),
});

export default Login;