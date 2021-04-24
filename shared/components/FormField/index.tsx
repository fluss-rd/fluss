import { TextField, TextFieldProps } from "@material-ui/core";
import React, { forwardRef, ForwardedRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

export type FormFieldProps = TextFieldProps & {
  underlined?: boolean;
};

const FormField = (props: FormFieldProps, ref: ForwardedRef<any>) => {
  const classes = useStyles();
  const { fullWidth, variant, InputLabelProps, InputProps, underlined, ...rest } = props;
  const underline: any = variant === "standard" ? { underline: underlined && classes.underline } : {};

  return (
    <TextField
      fullWidth={fullWidth}
      variant={variant}
      InputLabelProps={InputLabelProps}
      InputProps={{ ...InputProps, classes: underline }}
      ref={ref}
      {...rest}
    />
  );
};

const useStyles = makeStyles((theme) => ({
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
  InputProps: { notched: true },
  underlined: true,
};

export default ForwardedFormField;

