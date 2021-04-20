import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PowerSettingsNew } from "@material-ui/icons";
import { useGetUserData, useLogOut } from "hooks/auth-service";
import PopoverIcon from "shared/components/PopoverIcon";

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
          <PopoverIcon
            tooltipText="Cerrar sesión"
            icon={PowerSettingsNew}
            labeled={false}
            IconButtonProps={{ style: { padding: 0 } }}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className={classes.content}>
              <Typography variant="body1">
                <strong>¿Seguro que desea cerrar sesión?</strong>
              </Typography>
              <br />
              <div className={classes.action}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={logOut}
                  startIcon={logOutMutation.isLoading && <CircularProgress color="primary" />}
                >
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </PopoverIcon>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

const useStyles = makeStyles((theme) => ({
  content: { padding: theme.spacing(2) },
  action: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  buttons: {
    textTransform: "capitalize",
    margin: 0,
    padding: 0,
  },
}));

