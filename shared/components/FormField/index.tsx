import { TextField, TextFieldProps } from "@material-ui/core";
import React, { forwardRef, ForwardedRef } from "react";

const FormField = (props: TextFieldProps, ref: ForwardedRef<any>) => {
  const { fullWidth, variant, InputLabelProps, InputProps } = props;
  return (
    <TextField
      fullWidth={fullWidth}
      variant={variant}
      InputLabelProps={InputLabelProps}
      InputProps={InputProps}
      ref={ref}
      {...props}
    />
  );
};

const ForwardedFormField = forwardRef(FormField);

ForwardedFormField.defaultProps = {
  fullWidth: true,
  variant: "outlined",
  name: "latitude",
  InputLabelProps: { shrink: true },
  InputProps: { notched: true },
};

export default ForwardedFormField;

