import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AssignmentIndOutlined, Close } from "@material-ui/icons";
import Action from "models/Action";
import RolPermission from "models/RolPermission";
import React, { FC } from "react";

export type ActionEvent = {
  rolPermission: RolPermission;
  action: Action;
  index: number;
  checked: boolean;
};
export type RemoveEvent = { rolPermission: RolPermission; index: number };

export interface RolPermissionItemProps {
  mode: "permission" | "rol";
  rolPermission: RolPermission;
  index: number;
  onAction: (event: ActionEvent) => void;
  onRemove: (event: RemoveEvent) => void;
}

const RolPermissionItem: FC<RolPermissionItemProps> = ({ rolPermission, ...props }) => {
  const classes = useStyles();
  const { actions, rol, permission } = rolPermission;
  const title = props.mode === "rol" ? rol.name : permission.name;
  const description = props.mode === "rol" ? rol.description : permission.description;

  const onAction = (action: Action, checked: boolean) =>
    props.onAction({ rolPermission, index: props.index, action: action, checked });

  const onRemove = () => props.onRemove({ rolPermission, index: props.index });

  return (
    <div className={classes.root}>
      <ListItemAvatar>
        <Avatar>
          <AssignmentIndOutlined />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={description} />
      <div className={classes.buttons}>
        <div className={classes.actions}>
          {Object.keys(Action).map((key) => {
            const current: Action = Action[key];
            const checked = actions.find((a) => a === current) ? true : false;
            return (
              <ActionButton key={key} type={current} checked={checked} handleChange={onAction} />
            );
          })}
        </div>

        <IconButton onClick={onRemove}>
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

function ActionButton(props: {
  type: Action;
  checked: boolean;
  handleChange: (action: Action, checked: boolean) => void;
}) {
  const theme = useTheme();

  return (
    <Button
      size="small"
      variant="outlined"
      style={{ background: props.checked ? theme.palette.grey[200] : "transparent" }}
      onClick={() => props.handleChange(props.type, !props.checked)}
    >
      {props.type}
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  actions: {
    display: "flex",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default RolPermissionItem;
