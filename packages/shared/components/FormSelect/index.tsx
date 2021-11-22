import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, ForwardedRef, forwardRef, useMemo } from "react";

import generateId from "../../helpers/generateId";

interface FormSelectProps extends Omit<SelectProps, "ref"> {
  noneText?: string;
  noneValue?: any;
  error?: boolean;
  helperText?: string;
  FormControlProps?: Partial<FormControlProps>;
  selectRef?: any;
  size?: "medium" | "small";
}

const FormSelect = forwardRef((props: FormSelectProps, ref: ForwardedRef<any>) => {
  const classes = useStyles();
  const selectId = useMemo(() => generateId("select"), []);
  const { noneText, noneValue, FormControlProps, selectRef, helperText, ...rest } = props;

  return (
    <FormControl fullWidth variant="outlined" {...FormControlProps} ref={ref} size={rest.size}>
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
        <MenuItem value={noneValue}>
          <span className={classes.none}>{noneText}</span>
        </MenuItem>
        {props.children}
      </Select>
      <FormHelperText error={props.error}>{helperText}</FormHelperText>
    </FormControl>
  );
});

(FormSelect as FC<FormSelectProps>).defaultProps = {
  noneText: "Todos",
  noneValue: "",
  FormControlProps: {},
};

const useStyles = makeStyles((theme) => ({
  none: {
    color: theme.palette.grey[500],
  },
}));

export default FormSelect;

