import { Button, Grid, IconButton, InputAdornment, Link, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Image from "next/image";
import router from "next/router";
import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormField from "shared/components/FormField";
import { connect, StoreProps } from "store";

type LoginForm = {
  email: string;
  password: string;
};

const Login: FC<StoreProps> = ({ store }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, control, errors, formState } = useForm<LoginForm>({ mode: "onBlur" });
  const { isValid, isDirty, touched } = formState;

  const classes = useStyles();
  const push = (path: string) => () => router.push(path);
  const onSubmit = (data: LoginForm) => (isValid ? store.logIn() : null);

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

        <form
          noValidate
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            as={
              <FormField
                label="Email"
                placeholder="user@email.com"
                helperText={errors.email ? errors.email.message : null}
                error={errors.email ? true : false}
              />
            }
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Dirección de email inválida",
              },
            }}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            as={
              <FormField
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                placeholder="******"
                helperText={errors.password ? errors.password.message : null}
                error={errors.password ? true : false}
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
            }
            rules={{
              required: true,
              minLength: { value: 6, message: "La contraseña debe tener como mínimo 6 caracteres" },
              maxLength: {
                value: 100,
                message: "La contraseña debe tener como máximo 20 caracteres",
              },
            }}
          />
          <Link href="/recoverPassword" onClick={push("/recoverPassword")}>
            ¿Olvidó su contraseña?
          </Link>
          <br />
          <Button variant="contained" color="primary" size="large" type="submit">
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
