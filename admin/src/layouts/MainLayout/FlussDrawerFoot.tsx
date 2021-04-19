import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";
import { useGetUserData, useLogOut } from "hooks/auth-service";

export default function FlussDrawerFoot() {
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
        <ListItemText primary={userName} />
        <ListItemSecondaryAction>
          <IconButton onClick={logOut}>
            <PowerSettingsNew />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
