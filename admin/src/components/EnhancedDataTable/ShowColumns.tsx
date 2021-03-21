import { Checkbox, FormControl, FormControlLabel, FormGroup } from "@material-ui/core";
import { ViewColumn } from "@material-ui/icons";
import React, { MutableRefObject, useEffect } from "react";

import { DataTableRef } from "../DataTable";
import PopoverIcon from "../PopoverIcon";

interface CheckboxColumn {
  checked: boolean;
  label: string;
  toggleHidden: () => void;
}

export interface ShowColumnsProps<T extends object> {
  DataTableRef: MutableRefObject<DataTableRef<T>>;
}

function ShowColumns<T extends object>(props: ShowColumnsProps<T>) {
  const [state, setState] = React.useState({} as Record<keyof T, CheckboxColumn>);

  useEffect(fillStateWithColumn, []);

  function fillStateWithColumn() {
    const columns = props.DataTableRef.current.context.allColumns;
    const columnMap = {} as Record<keyof T, CheckboxColumn>;

    for (const column of columns)
      columnMap[column.id as keyof T] = {
        checked: true,
        label: column.Header,
        toggleHidden: column.toggleHidden,
      } as CheckboxColumn;

    setState(columnMap);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.name;
    const checked = event.target.checked;

    const modified: CheckboxColumn = state[id];
    modified.checked = checked;
    modified.toggleHidden();
    setState({ ...state, [id]: modified });
  }

  return (
    <PopoverIcon title="COLUMNAS" icon={ViewColumn}>
      <FormControl component="fieldset">
        <FormGroup>
          {Object.keys(state).map((column) => {
            const tableColumn: CheckboxColumn = state[column];
            return (
              <FormControlLabel
                key={column}
                control={
                  <Checkbox checked={tableColumn.checked} name={column} onChange={handleChange} />
                }
                label={tableColumn.label}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </PopoverIcon>
  );
}

export default ShowColumns;
