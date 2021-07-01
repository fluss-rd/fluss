import { makeStyles } from "@material-ui/core/styles";
import React, { useMemo, ChangeEvent, CSSProperties } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormControlProps,
} from "@material-ui/core";
import generateId from "../../../helpers/generateId";
import { useDataTable } from "../DataTableContext";

interface SelectColumnFilterProps<T> {
  columnId: keyof T;
  size?: "small" | "medium";
  style?: CSSProperties;
  className?: string;
  FormControlProps?: Partial<FormControlProps>;
  label?: string;
  placeholder?: string;
}

function SelectColumnFilter<T>(props: SelectColumnFilterProps<T>) {
  const { table } = useDataTable();
  const column = table.allColumns.find((column) => column.id === props.columnId);
  const { filterValue, setFilter, preFilteredRows, id, Header } = column;
  const classes = useStyles();
  const selectId = useMemo(() => generateId("select"), []);
  const options = useMemo(computeOptions, [id, preFilteredRows]);

  function onChange(e: ChangeEvent<{ name?: string; value: string }>) {
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
    <div style={props.style} className={props.className}>
      <FormControl fullWidth variant="outlined" size={props.size} {...props.FormControlProps}>
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
            <span className={classes.none}>{props.placeholder || "TODOS"}</span>
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

SelectColumnFilter.defaultProps = {
  size: "medium",
};

export default SelectColumnFilter;

