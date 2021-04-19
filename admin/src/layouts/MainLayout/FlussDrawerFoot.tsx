import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";
import { getUserId, removeToken } from "helpers/token";
import { useGetUserData, useLogOut } from "hooks/auth-service";

export default function FlussDrawerFoot() {
  const logOutMutation = useLogOut();
  const userId = getUserId();
  const userQuery = useGetUserData(userId);
  const response = userQuery.data;
  const userName =
    userQuery.isSuccess && response && response.data
      ? `${response.data.name} ${response.data.surname}`
      : null;

  const logOut = () => {
    const userId = getUserId();
    removeToken();

    logOutMutation.mutate(userId);
  };
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
