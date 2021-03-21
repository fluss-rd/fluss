import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { ColumnInstance } from "react-table";

import generateId from "../../helpers/generateId";

interface NumberRangeColumnFilterProps<T extends object> {
  column: ColumnInstance<T>;
}

function NumberRangeColumnFilter<T extends object>(props: NumberRangeColumnFilterProps<T>) {
  const { filterValue = [], preFilteredRows, setFilter, id, Header } = props.column;
  const classes = useStyles();
  const selectId = generateId("select");

  const [value, setValue] = useState("");
  const [digit, setDigit] = useState("");
  const [secondDigit, setSecondDigit] = useState("");

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  useEffect(() => {
    const newDigit1 = parseInt(digit, 10);
    if (isNaN(newDigit1)) return;

    setFilter((old = []) => [newDigit1, old[1]]);
  }, [digit]);

  useEffect(() => {
    const newSecondDigit = parseInt(secondDigit, 10);
    if (isNaN(newSecondDigit)) return;

    setFilter((old = []) => [old[0], newSecondDigit]);
  }, [secondDigit]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const value = event.target.value;
    setValue(value);
  }

  function onChangeSecondDigit(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setSecondDigit(event.target.value);
  }

  function onChangeFirstDigit(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setDigit(event.target.value);
  }

  return (
    <div className={classes.container}>
      <FormControl variant="outlined" fullWidth={true}>
        <InputLabel id={`${selectId}-label`} shrink>
          {Header}
        </InputLabel>
        <Select
          displayEmpty
          labelId={`${selectId}-label`}
          id={selectId}
          value={value}
          onChange={handleChange}
          input={<OutlinedInput notched label={Header} />}
        >
          <MenuItem value="">
            <span className={classes.none}>Todos</span>
          </MenuItem>
          {Object.keys(Options).map((key) => {
            const current = Options[key];
            return (
              <MenuItem key={key} value={current}>
                {current}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {value && (
        <div className={classes.digits}>
          <TextField
            fullWidth={true}
            variant="outlined"
            type="number"
            onChange={onChangeFirstDigit}
          />
          {value === Options.Between && (
            <>
              <Typography variant="body1">y</Typography>
              <TextField
                fullWidth={true}
                variant="outlined"
                type="number"
                onChange={onChangeSecondDigit}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

enum Options {
  LesThan = "Menor que",
  GreaterThan = "Mayor que",
  LesThanOrEqualTo = "Menor o igual que",
  GreaterThanOrEqualTo = "Mayor o igual que",
  Between = "Entre",
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(2),
    width: "100%",
    alignItems: "center",
    display: "flex",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  digits: {
    alignItems: "center",
    display: "flex",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  none: {
    color: theme.palette.grey[500],
  },
}));

export default NumberRangeColumnFilter;
