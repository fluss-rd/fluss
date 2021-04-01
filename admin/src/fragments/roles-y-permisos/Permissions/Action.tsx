import { Checkbox, FormControlLabel, makeStyles } from "@material-ui/core";
import ActionsModel, { ActionType } from "models/Actions";
import { ChangeEvent, useMemo } from "react";

export type ActionsEvent = {
  checked: boolean;
  actionType: ActionType;
  groupIndex: number;
  actionIndex: number;
};

export default function Actions(props: {
  actions: ActionsModel;
  groupIndex: number;
  actionIndex: number;
  handleChange: (event: ActionsEvent) => void;
}) {
  function handleChange(checked: boolean, type: ActionType) {
    props.handleChange({
      checked,
      actionType: type,
      groupIndex: props.groupIndex,
      actionIndex: props.actionIndex,
    });
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Action checked={props.actions.read} type="read" onChange={handleChange} />
      <Action checked={props.actions.write} type="write" onChange={handleChange} />
      <Action checked={props.actions.delete} type="delete" onChange={handleChange} />
    </div>
  );
}

export function Action(props: {
  checked: boolean;
  type: ActionType;
  onChange: (checked: boolean, type: ActionType) => void;
}) {
  const classes = useActionStyles();
  const label = useMemo(() => ActionsModel.actionTypeToText(props.type), [props.type]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    props.onChange(checked, props.type);
  }

  return (
    <FormControlLabel
      value="bottom"
      control={
        <Checkbox
          color="primary"
          checked={props.checked}
          className={classes.margin}
          onChange={handleChange}
          size="small"
        />
      }
      label={label}
      labelPlacement="bottom"
      className={classes.margin}
    />
  );
}

const useActionStyles = makeStyles({
  margin: {
    width: "100%",
  },
});
