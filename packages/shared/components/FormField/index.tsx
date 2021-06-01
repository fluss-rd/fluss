import { TextField, TextFieldProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { ForwardedRef, forwardRef } from "react";

export type FormFieldProps = TextFieldProps & {
  underlined?: boolean;
};

const FormField = (props: FormFieldProps, ref: ForwardedRef<any>) => {
  const classes = useStyles();
  const { fullWidth, variant, InputLabelProps, InputProps, underlined, ...rest } = props;
  const inputProps = variant === "outlined" ? { notched: true, ...InputProps } : InputProps;
  const underline: any =
    variant === "standard" ? { underline: underlined && classes.underline } : {};

  return (
    <TextField
      fullWidth={fullWidth}
      variant={variant}
      InputLabelProps={InputLabelProps}
      InputProps={{ ...inputProps, classes: underline }}
      ref={ref}
      {...rest}
    />
  );
};

const useStyles = makeStyles(() => ({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
}));

const ForwardedFormField = forwardRef(FormField);

ForwardedFormField.defaultProps = {
  fullWidth: true,
  variant: "outlined",
  name: "latitude",
  InputLabelProps: { shrink: true },
  InputProps: {},
  underlined: true,
};

export default ForwardedFormField;
