import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import generateId from "../../../helpers/generateId";
import React, { ChangeEvent, useCallback, useMemo } from "react";
import { ColumnInstance } from "react-table";

import { Options } from ".";

interface NumberRangeColumnFilterProps<T extends object> {
  column: ColumnInstance<T>;
}

function NumberRangeColumnFilter<T extends object>(props: NumberRangeColumnFilterProps<T>) {
  const classes = useStyles();
  const selectId = React.useMemo(() => generateId("select"), []);
  const { Header, filterValue, setFilter, preFilteredRows, id } = props.column;
  const operator = filterValue === undefined ? "" : filterValue[2];
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  const handleOperatatorChange = useCallback((e: ChangeEvent<{ value: string; name?: string }>) => {
    setFilter((old = []) => [old[0], old[1], e.target.value]);
  }, []);

  const handleDigit1 = useCallback(
    (e: ChangeEvent<{ value: string }>) => {
      const value = parseInt(e.target.value, 10);
      setFilter((old = []) => [!isNaN(value) ? value : undefined, old[1], old[2]]);
    },
    [setFilter]
  );

  const handleDigit2 = useCallback(
    (e: ChangeEvent<{ value: string }>) => {
      const value = parseInt(e.target.value, 10);
      setFilter((old = []) => [old[0], !isNaN(value) ? value : undefined, old[2]]);
    },
    [setFilter]
  );

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
          value={operator}
          onChange={handleOperatatorChange}
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
        <FormHelperText>
          Min: {min}, Max: {max}
        </FormHelperText>
      </FormControl>

      {operator && (
        <div className={classes.digits}>
          <TextField
            fullWidth
            value={filterValue ? filterValue[0] || "" : ""}
            variant="outlined"
            type="number"
            placeholder={`Máx: ${max}`}
            onChange={handleDigit1}
            helperText=" "
          />
          {operator === Options.Between && (
            <>
              <Typography variant="body1">y</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                placeholder={`Mín: ${min}`}
                value={filterValue ? filterValue[1] || "" : ""}
                onChange={handleDigit2}
                helperText=" "
              />
            </>
          )}
        </div>
      )}
    </div>
  );
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
    height: "100%",
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
