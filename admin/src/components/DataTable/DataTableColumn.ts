import { Column } from "react-table";

/* eslint-disable @typescript-eslint/ban-types */
type DataTableColumn<T extends object> = { columnWidth?: string } & Column<T>;

export default DataTableColumn;
