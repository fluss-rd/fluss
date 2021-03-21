import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { ColumnInstance, Row } from "react-table";

import generateId from "../../helpers/generateId";

interface SelectColumnFilterProps<T extends object> {
  column: ColumnInstance<T>;
}

function SelectColumnFilter<T extends object>(props: SelectColumnFilterProps<T>) {
  const { filterValue, setFilter, preFilteredRows, id, Header } = props.column;
  const classes = useStyles();
  const selectId = generateId("select");
  const [value, setValue] = useState("");
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: Row<T>) => options.add(row.values[id]));

    return [...options.values()];
  }, [id, preFilteredRows]);

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    const value = event.target.value as string;
    setValue(value);
    setFilter(value || undefined);
  }

  return (
    <div style={{ width: "100%" }}>
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
          {options.map((option: string, i: number) => {
            return (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  none: {
    color: theme.palette.grey[500],
  },
}));

export default SelectColumnFilter;
