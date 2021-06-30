import { makeStyles } from "@material-ui/core/styles";
import React, { useMemo } from "react";
import { ColumnInstance } from "react-table";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@material-ui/core";
import generateId from "../../../helpers/generateId";

interface SelectColumnFilterProps<T extends object> {
  column: ColumnInstance<T>;
}

function SelectColumnFilter<T extends object>(props: SelectColumnFilterProps<T>) {
  const { filterValue, setFilter, preFilteredRows, id, Header } = props.column;
  const classes = useStyles();
  const selectId = useMemo(() => generateId("select"), []);
  const options = useMemo(computeOptions, [id, preFilteredRows]);

  function onChange(e: React.ChangeEvent<{ name?: string; value: string }>) {
    setFilter(e.target.value || undefined);
  }

  function computeOptions() {
    const options = new Set();

    console.log({
      filterValue,
      setFilter,
      preFilteredRows,
      id,
      Header,
    });

    preFilteredRows?.forEach((row) => {
      options.add(row.values[id]);
    });

    return [...options.values()];
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
          onChange={onChange}
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

