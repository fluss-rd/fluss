import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { ColumnInstance, Row } from "react-table";

import generateId from "../../helpers/generateId";

interface SelectColumnFilterProps<T extends object> {
  column: ColumnInstance<T>;
}

function SelectColumnFilter<T extends object>(props: SelectColumnFilterProps<T>) {
  const { filterValue, setFilter, preFilteredRows, id, Header } = props.column;
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
    <FormControl variant="outlined" fullWidth={true}>
      <InputLabel id="demo-simple-select-outlined-label">{Header}</InputLabel>
      <Select
        labelId={`${selectId}-label`}
        id={selectId}
        value={value}
        onChange={handleChange}
        label={Header}
      >
        <MenuItem value="">
          <em>Todos</em>
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
  );
}

export default SelectColumnFilter;
