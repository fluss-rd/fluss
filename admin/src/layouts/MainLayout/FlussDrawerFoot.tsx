import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PowerSettingsNew } from "@material-ui/icons";
import { useGetUserData, useLogOut } from "hooks/auth-service";
import clsx from "clsx";

export default function FlussDrawerFoot() {
  const classes = useStyles();
  const logOutMutation = useLogOut();
  const userQuery = useGetUserData();
  const response = userQuery.data;
  const userName =
    userQuery.isSuccess && response && response.data
      ? `${response.data.name} ${response.data.surname}`
      : null;

  const logOut = () => logOutMutation.mutate();

  return (
    <List>
      <ListItem>
        <Button className={classes.buttons}>{userName}</Button>
        <ListItemSecondaryAction>
          <IconButton onClick={logOut} className={classes.buttons}>
            <PowerSettingsNew />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

const useStyles = makeStyles((theme) => ({
  buttons: {
    textTransform: "capitalize",
    margin: 0,
    padding: 0,
  },
}));

