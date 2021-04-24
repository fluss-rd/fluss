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

interface FormSelectProps extends Omit<SelectProps, "ref"> {
  noneText?: string;
  noneValue?: any;
  error?: boolean;
  helperText?: string;
  FormControlProps?: Partial<FormControlProps>;
  selectRef?: any;
}

const FormSelect: FC<FormSelectProps> = (props) => {
  const classes = useStyles();
  const selectId = useMemo(() => generateId("select"), []);
  const { noneText, FormControlProps, selectRef, helperText, ...rest } = props;

  return (
    <FormControl fullWidth variant="outlined" {...FormControlProps}>
      <InputLabel shrink id={`${selectId}-label`}>
        {props.label}
      </InputLabel>
      <Select
        displayEmpty
        labelId={`${selectId}-label`}
        id={selectId}
        onChange={props.onChange}
        input={<OutlinedInput notched label={props.label} />}
        ref={selectRef}
        {...rest}
      >
        <MenuItem value={props.noneValue ? props.noneValue : ""}>
          <span className={classes.none}>{noneText}</span>
        </MenuItem>
        {props.children}
      </Select>
      <FormHelperText error={props.error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

FormSelect.defaultProps = {
  noneText: "Todos",
  FormControlProps: {},
};

const useStyles = makeStyles((theme) => ({
  none: {
    color: theme.palette.grey[500],
  },
}));

export default FormSelect;

