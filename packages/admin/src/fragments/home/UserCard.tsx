import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Update } from "@material-ui/icons";
import React, { FC } from "react";

interface UserCardProps {}

const UserCard: FC<UserCardProps> = (props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Mikhael Santos Fernández</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Administrador
        </Typography>

        <br />

        <div className={classes.lastAccess}>
          <Update fontSize="small" />
          <Typography variant="caption">Último acceso: Hace 1 hora</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  lastAccess: {
    display: "flex",
    alignItems: "center",

    "& > :not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default UserCard;
