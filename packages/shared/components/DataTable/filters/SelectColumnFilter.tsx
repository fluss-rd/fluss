import { FormControl, FormControlProps, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { ChangeEvent, CSSProperties, useMemo } from "react";
import { ColumnInstance } from "react-table";

import generateId from "../../../helpers/generateId";
import { useDataTable } from "../DataTableContext";

type CommonProps<T extends object> = {
  size?: "small" | "medium";
  style?: CSSProperties;
  className?: string;
  FormControlProps?: Partial<FormControlProps>;
  placeholder?: string;
  columnId?: keyof T;
  column?: Partial<ColumnInstance<T>>;
};

// If columnId is provided, not use column, otherwise, use it.
type ColumnProps<T extends Object> =
  | { columnId: keyof T; column?: never }
  | { column: Partial<ColumnProps<T>>; columnId?: never };

export type SelectColumnFilterProps<T extends object> = CommonProps<T> & ColumnProps<T>;

function SelectColumnFilter<T extends object>(props: SelectColumnFilterProps<T>) {
  const { table } = useDataTable();
  const column = props.column || table.allColumns.find((column) => column.id === props.columnId);
  const { filterValue, setFilter, preFilteredRows, id, Header } = column;
  const classes = useStyles();
  const selectId = useMemo(() => generateId("select"), []);
  const options = useMemo(computeOptions, [id, preFilteredRows]);

  function onChange(e: ChangeEvent<{ name?: string; value: string }>) {
    setFilter(e.target.value || undefined);
  }

  function computeOptions() {
    const options = new Set();

    preFilteredRows?.forEach((row) => {
      options.add(row.values[id]);
    });

    return [...options.values()];
  }

  return (
    <div style={props.style} className={props.className}>
      <FormControl fullWidth size={props.size} {...props.FormControlProps}>
        <Select
          displayEmpty
          labelId={`${selectId}-label`}
          id={selectId}
          value={filterValue || ""}
          onChange={onChange}
          disableUnderline
        >
          <MenuItem value="">
            <span className={classes.none}>{Header || props.placeholder || "Todos"}</span>
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
  noUnderline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
}));

SelectColumnFilter.defaultProps = {
  size: "medium",
};

export default SelectColumnFilter;
