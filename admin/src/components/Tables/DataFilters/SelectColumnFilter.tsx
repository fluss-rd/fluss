import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";
import generateId from "helpers/generateId";
import React, { useMemo } from "react";
import { ColumnInstance, Row } from "react-table";

interface SelectColumnFilterProps<T extends object> {
  column: ColumnInstance<T>;
}

function SelectColumnFilter<T extends object>(props: SelectColumnFilterProps<T>) {
  const { filterValue, setFilter, preFilteredRows, id, Header } = props.column;
  const classes = useStyles();
  const selectId = useMemo(() => generateId("select"), []);
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: Row<T>) => options.add(row.values[id]));

    return [...options.values()];
  }, [id, preFilteredRows]);

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    const value = event.target.value as string;
    setFilter(value || undefined);
  }

  return (
    <div style={{ width: "100%" }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel shrink id={`${selectId}-label`}>
          {Header}
        </InputLabel>
        <Select
          displayEmpty
          labelId={`${selectId}-label`}
          id={selectId}
          value={filterValue || ""}
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
