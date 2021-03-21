import { Checkbox, FormControl, FormControlLabel, FormGroup } from "@material-ui/core";
import { ViewColumn } from "@material-ui/icons";
import { DataTableColumn } from "components/DataTable";
import PopoverIcon from "components/PopoverIcon";
import { ChangeEvent, CSSProperties } from "react";
import { ColumnInstance } from "react-table";

export interface ShowColumnsProps<T extends object> {
  columns: DataTableColumn<T>[];
}

interface HiddenProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  style: CSSProperties;
  title: string;
}

function ShowColumns<T extends object>({ columns }: ShowColumnsProps<T>) {
  return (
    <PopoverIcon title="Columnas" icon={ViewColumn}>
      <FormControl component="fieldset">
        <FormGroup>
          {columns.map((column: DataTableColumn<T>) => {
            const hiddenProps: HiddenProps = (column as ColumnInstance<T>).getToggleHiddenProps();
            return (
              <FormControlLabel
                key={column.id}
                label={column.Header as string}
                control={
                  <Checkbox
                    checked={hiddenProps.checked}
                    name={column.Header as string}
                    onChange={hiddenProps.onChange}
                  />
                }
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </PopoverIcon>
  );
}

export default ShowColumns;
