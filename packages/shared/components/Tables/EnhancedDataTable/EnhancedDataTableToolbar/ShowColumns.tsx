import { Checkbox, FormControl, FormControlLabel, FormGroup } from "@material-ui/core";
import { ViewColumn } from "@material-ui/icons";
import { ChangeEvent, CSSProperties, FC } from "react";
import { ColumnInstance } from "react-table";

import PopoverIcon from "../../../PopoverIcon";

export interface ShowColumnsProps<T extends object> {
  columns: ColumnInstance<T>[];
  title?: string;
  labeled?: boolean;
}

interface HiddenProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  style: CSSProperties;
  title: string;
}

function ShowColumns<T extends object>({ columns, title, labeled }: ShowColumnsProps<T>) {
  return (
    <PopoverIcon title={title} icon={ViewColumn} labeled={labeled}>
      <FormControl component="fieldset">
        <FormGroup>
          {columns.map((column: ColumnInstance<T>) => {
            const hiddenProps: HiddenProps = column.getToggleHiddenProps();
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

(ShowColumns as FC<ShowColumnsProps<any>>).defaultProps = {
  title: "Columnas",
  labeled: false,
};

export default ShowColumns;
