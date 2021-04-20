import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import FormIconTitle from "shared/components/FormIconTitle";
import { Typography, Button } from "@material-ui/core";
import FormField from "shared/components/FormField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

interface UserInfoProps {}

const UserInfo: FC<UserInfoProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h5">Información de cuenta</Typography>

        <FormIconTitle Icon={PermIdentityOutlinedIcon} title="Datos personales" />

        <FormField name="name" label="Nombre" />
        <FormField name="surname" label="Apellidos" />
        <FormField name="email" label="Correo" />

        <br />
        <div className={classes.actions}>
          <Button variant="outlined" color="primary">
            Guardar cambios
          </Button>
        </div>

        <br />

        <FormIconTitle Icon={LockOutlinedIcon} title="Contraseña" marginBottom={1} />

        <Button variant="outlined">Cambiar contraseña</Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    flexGrow: 1,
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  actions: {
    marginTop: theme.spacing(2),
  },
}));

export default UserInfo;

