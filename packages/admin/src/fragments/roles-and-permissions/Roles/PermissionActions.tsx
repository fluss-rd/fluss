import { Permission } from "services/auth/models";
import PermissionAction, { actions, actionToString } from "models/PermissionAction";
import { makeStyles, useTheme, lighten } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { FC } from "react";

interface PermissionActionsProps {
  index: number;
  permission: Permission;
  onRemove: (permission: Permission, index: number) => void;
  onAction: (permission: Permission, index: number) => void;
}

const PermissionActions: FC<PermissionActionsProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const includesAllActions = props.permission.actions.includes("*");

  const onRemove = () => {
    props.onRemove(props.permission, props.index);
  };

  const onAction = (action: PermissionAction, index: number, isChecked: boolean) => {
    return () => {
      // Create a deep copy of the object to avoid using the reference.
      const modified: Permission = {
        resource: props.permission.resource,
        actions: [...props.permission.actions],
      };

      if (!isChecked) modified.actions.push(action);
      else modified.actions.splice(index, 1);

      props.onAction(modified, props.index);
    };
  };

  return (
    <ListItem>
      <ListItemText primary={props.permission.resource} />
      <ListItemSecondaryAction className={classes.actions}>
        {actions.map((action) => {
          if (action === "*") return null;

          const actionName = actionToString(action);
          const actionIndex = props.permission.actions.indexOf(action);
          const isChecked = actionIndex !== -1 || includesAllActions;
          const background = isChecked ? lighten(theme.palette.secondary.main, 0.7) : "";

          return (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={onAction(action, actionIndex, isChecked)}
              key={action}
              style={{ background }}
            >
              {actionName}
            </Button>
          );
        })}
        <IconButton onClick={onRemove}>
          <Close />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  actions: {
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default PermissionActions;

