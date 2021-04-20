import { Button, FormControlLabel, Switch, Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Tune } from "@material-ui/icons";
import React, { FC, useState } from "react";
import FormIconTitle from "shared/components/FormIconTitle";

interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = (props) => {
  const classes = useStyles();
  const [status, setStatus] = useState(false);
  const theme = useTheme();

  const changeStatus = () => setStatus((prev) => !prev);

  return (
    <div>
      <Typography variant="h5">Notificaciones</Typography>

      <br />

      <FormIconTitle Icon={Tune} title="Activar/desactivar notificaciones" marginBottom={1} />

      <FormControlLabel
        label=""
        control={
          <Switch
            checked={status}
            onChange={changeStatus}
            name="notificationsStatus"
            color="primary"
          />
        }
      />

      <br />

      <Button variant="outlined" color="primary" style={{ marginTop: theme.spacing(4) }}>
        Guardar cambios
      </Button>
    </div>
  );
};

const useStyles = makeStyles({});

export default Notifications;
