import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";

interface NullActionsProps {
  rolName: string;
  permissionName: string;
}

const NullActions: FC<NullActionsProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="caption" color="textSecondary" className={classes.caption}>
        No se ha asignado el permiso {props.permissionName} al rol {props.rolName}
      </Typography>
      <div>
        <Button variant="outlined" size="small">
          Asignar permiso
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  caption: {
    marginBottom: theme.spacing(1),
  },
}));

export default NullActions;
