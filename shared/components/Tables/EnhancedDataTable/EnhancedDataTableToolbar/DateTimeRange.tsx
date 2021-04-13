import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useState } from "react";
import { KeyboardDatePicker, KeyboardDatePickerProps } from "@material-ui/pickers";
import clsx from "clsx";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PopoverIcon from "../../../PopoverIcon";
import DateRangeIcon from "@material-ui/icons/DateRange";

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
      <PopoverIcon title={props.title} icon={DateRangeIcon} labeled={props.labeled}>
        <div className={classes.root}>
          <KeyboardDatePicker
            autoOk
            size={props.inputSize}
            style={{ width: 300 }}
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
          <KeyboardDatePicker
            autoOk
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
        </div>
      </PopoverIcon>
    </MuiPickersUtilsProvider>
  );
};

DateTimeRange.defaultProps = {
  format: "dd/MM/yyyy",
  startLabel: "Fecha de inicio",
  endLabel: "Fecha de fin",
  StartKeyboardDatePickerProps: {},
  EndKeyboardDatePickerProps: {},
  title: "Rango de fechas",
  labeled: false,
  inputSize: "medium",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(2),
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
      width: "100%",
    },
  },
  input: {
    paddingLeft: 0,
  },
}));

export default DateTimeRange;

