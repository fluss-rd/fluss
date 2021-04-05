import { TextField, TextFieldProps } from "@material-ui/core";
import React, { FC } from "react";

const FormField: FC<TextFieldProps> = (props) => {
  const { fullWidth, variant, InputLabelProps, InputProps } = props;
  return (
    <TextField
      fullWidth={fullWidth}
      variant={variant}
      InputLabelProps={InputLabelProps}
      InputProps={InputProps}
      {...props}
    />
  );
};

FormField.defaultProps = {
  fullWidth: true,
  variant: "outlined",
  name: "latitude",
  InputLabelProps: { shrink: true },
  InputProps: { notched: true },
};

export default FormField;
