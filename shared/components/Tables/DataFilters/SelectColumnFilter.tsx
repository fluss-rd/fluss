import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";
import generateId from "../../../helpers/generateId";
import { usePrevious } from "../../../hooks";
import React, { memo, useEffect, useMemo, useState } from "react";
import { ColumnInstance, Row } from "react-table";

interface SelectColumnFilterProps<T extends object> {
  column: ColumnInstance<T>;
  startLoading?: () => void;
  stopLoading?: () => void;
}

function SelectColumnFilter<T extends object>(
  props: SelectColumnFilterProps<T>
) {
  const { filterValue, setFilter, preFilteredRows, id, Header } = props.column;
  const [current, setCurrent] = useState(filterValue || "");
  const prevValue = usePrevious(current);
  const classes = useStyles();
  const selectId = useMemo(() => generateId("select"), []);

  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: Row<T>) => options.add(row.values[id]));

    return [...options.values()];
  }, [id, preFilteredRows]);

  useEffect(() => {
    if (current === prevValue) return;
    else if (current === "" && filterValue === undefined) return;

    if (props.startLoading) props.startLoading();

    const delay = setTimeout(() => {
      setFilter(current || undefined);
      if (props.stopLoading) props.stopLoading();
    }, 400);

    return () => clearTimeout(delay);
  }, [current]);

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    const newValue = event.target.value as string;
    setCurrent(newValue);
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
          value={current}
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

export default memo(SelectColumnFilter);

