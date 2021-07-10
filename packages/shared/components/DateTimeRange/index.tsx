import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker, KeyboardDatePickerProps } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import clsx from "clsx";
import React, { FC, useState } from "react";
import { Grid } from "@material-ui/core";

interface DateTimeRangeProps {
  title?: string;
  labeled?: boolean;
  inputsClassName?: string;
  inputSize?: "small" | "medium";
  format?: string;
  startLabel?: string;
  endLabel?: string;
  StartKeyboardDatePickerProps?: Partial<KeyboardDatePickerProps>;
  EndKeyboardDatePickerProps?: Partial<KeyboardDatePickerProps>;
}

const DateTimeRange: FC<DateTimeRangeProps> = (props) => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={{ display: "flex" }}>
          <KeyboardDatePicker
            autoOk
            size={props.inputSize}
            style={{ width: "100%" }}
            variant="inline"
            inputVariant="outlined"
            label={props.startLabel}
            format="dd/MM/yyyy"
            value={selectedDate}
            InputProps={{ className: clsx(classes.input, props.inputsClassName) }}
            InputAdornmentProps={{ position: "start" }}
            onChange={(date) => handleDateChange(date)}
            {...props.StartKeyboardDatePickerProps}
          />
        </Grid>
        <Grid item xs={12} md={6} style={{ display: "flex" }}>
          <KeyboardDatePicker
            autoOk
            style={{ width: "100%" }}
            size={props.inputSize}
            variant="inline"
            inputVariant="outlined"
            label={props.endLabel}
            format={props.format}
            InputProps={{ className: clsx(classes.input, props.inputsClassName) }}
            value={selectedDate}
            InputAdornmentProps={{ position: "start" }}
            onChange={(date) => handleDateChange(date)}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

DateTimeRange.defaultProps = {
  format: "dd/MM/yyyy",
  startLabel: "Desde",
  endLabel: "Hasta",
  StartKeyboardDatePickerProps: {},
  EndKeyboardDatePickerProps: {},
  title: "Rango de fechas",
  labeled: false,
  inputSize: "medium",
};

const useStyles = makeStyles((theme) => ({
  input: {
    paddingLeft: 0,
  },
}));

export default DateTimeRange;

