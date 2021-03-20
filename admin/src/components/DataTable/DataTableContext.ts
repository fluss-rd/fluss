/* eslint-disable @typescript-eslint/ban-types */
import { createContext } from "react";
import { HeaderGroup, TableInstance } from "react-table";

export type DataTableContextValue<T extends object> = {
  headerGroups: HeaderGroup<T>[];
  sortingColumnId: string;
  table: TableInstance<T>;
};

const DataTableContext = createContext<DataTableContextValue<any>>({
  headerGroups: [],
  sortingColumnId: "",
  table: {} as any,
});

export default DataTableContext;
