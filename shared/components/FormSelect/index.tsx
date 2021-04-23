import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import generateId from "../../helpers/generateId";
import React, { FC, useMemo } from "react";

interface FormSelectProps extends SelectProps {
  noneText?: string;
  noneValue?: any;
  error?: boolean;
  helperText?: string;
  FormControlProps?: Partial<FormControlProps>;
}

const FormSelect: FC<FormSelectProps> = (props) => {
  const classes = useStyles();
  const selectId = useMemo(() => generateId("select"), []);
  const { noneText, FormControlProps, ...rest } = props;

  return (
    <FormControl fullWidth variant="outlined" {...FormControlProps}>
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
        {...rest}
      >
        <MenuItem value={props.noneValue ? props.noneValue : ""}>
          <span className={classes.none}>{noneText}</span>
        </MenuItem>
        {props.children}
      </Select>
      <FormHelperText error={props.error}>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

FormSelect.defaultProps = {
  noneText: "Todos",
  value: "",
  FormControlProps: {},
};

const useStyles = makeStyles((theme) => ({
  none: {
    color: theme.palette.grey[500],
  },
}));

export default FormSelect;

