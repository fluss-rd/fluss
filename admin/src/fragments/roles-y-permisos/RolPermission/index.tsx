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
import Actions, { ActionType } from "models/Actions";
import React, { FC } from "react";

interface RolPermissionProps {
  actions: Actions;
  index: number;
  handleActionsChange: (actions: Actions, index: number) => void;
  remove: (actions: Actions, index: number) => void;
}

const RolPermission: FC<RolPermissionProps> = ({ actions, index, handleActionsChange, remove }) => {
  const classes = useStyles();

  function handleChange(type: ActionType, checked: boolean) {
    const modified = { ...actions };
    modified[type] = checked;
    handleActionsChange(modified, index);
  }

  function deletePermission() {
    remove(actions, index);
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AssignmentIndOutlined />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={actions.rol.name} secondary={actions.rol.description} />
      <ListItemSecondaryAction>
        <div className={classes.buttons}>
          <div className={classes.actions}>
            <ActionButton type="read" checked={actions.read} handleChange={handleChange} />
            <ActionButton type="write" checked={actions.write} handleChange={handleChange} />
            <ActionButton type="delete" checked={actions.delete} handleChange={handleChange} />
          </div>

          <IconButton onClick={deletePermission}>
            <Close />
          </IconButton>
        </div>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

function ActionButton(props: {
  type: ActionType;
  checked: boolean;
  handleChange: (type: ActionType, checked: boolean) => void;
}) {
  const theme = useTheme();

  return (
    <Button
      size="small"
      variant="outlined"
      style={{ background: props.checked ? theme.palette.grey[200] : "transparent" }}
      onClick={() => props.handleChange(props.type, !props.checked)}
    >
      {Actions.actionTypeToText(props.type)}
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
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

export default RolPermission;
