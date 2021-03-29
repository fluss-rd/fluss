import { Checkbox, FormControlLabel, makeStyles } from "@material-ui/core";
import PermissionModel, { Actions as ActionModel } from "models/Permission";

export default function Permission(props: { actions: ActionModel }) {
  return (
    <div style={{ display: "flex" }}>
      {props.actions.map((checked, i) => (
        <Action key={i} checked={checked} index={i} />
      ))}
    </div>
  );
}

export function Action(props: { checked: boolean; index: number }) {
  const classes = useActionStyles();
  const label = PermissionModel.actionName(props.index);

  return (
    <FormControlLabel
      value="bottom"
      control={<Checkbox color="primary" checked={props.checked} className={classes.margin} />}
      label={label}
      labelPlacement="bottom"
      className={classes.margin}
    />
  );
}

const useActionStyles = makeStyles({
  margin: {
    "&:first-of-type": {
      marginLeft: 0,
      paddingLeft: 0,
    },
  },
});
