import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import generateId from "helpers/generateId";
import React, { FC, useMemo } from "react";

interface FormSelectProps extends SelectProps {
  noneText?: string;
}

const FormSelect: FC<FormSelectProps> = (props) => {
  const classes = useStyles();
  const selectId = useMemo(() => generateId("select"), []);
  const { noneText } = props;

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel shrink id={`${selectId}-label`}>
        {props.label}
      </InputLabel>
      <Select
        displayEmpty
        labelId={`${selectId}-label`}
        id={selectId}
        value={props.value}
        onChange={props.onChange}
        input={<OutlinedInput notched label={props.label} />}
        {...props}
      >
        <MenuItem value="">
          <span className={classes.none}>{noneText}</span>
        </MenuItem>
        {props.children}
      </Select>
    </FormControl>
  );
};

FormSelect.defaultProps = {
  noneText: "Todos",
  value: "",
};

const useStyles = makeStyles((theme) => ({
  none: {
    color: theme.palette.grey[500],
  },
}));

export default FormSelect;
