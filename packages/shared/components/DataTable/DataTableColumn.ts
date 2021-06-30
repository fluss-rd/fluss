import { CSSProperties } from "react";
import { Column } from "react-table";

type Modify<T, R> = Omit<T, keyof R> & R;

type DataTableColumn<T extends object> = Modify<
  Column<T>,
  {
    columnTitleStyles?: CSSProperties;
    columnWidth?: string;
    filter?:
      | "equals"
      | "between"
      | "includes"
      | ((rows: Array<{ values: T }>, id: keyof T, filterValue: any) => Array<{ values: T }>);
  }
>;

export default DataTableColumn;
