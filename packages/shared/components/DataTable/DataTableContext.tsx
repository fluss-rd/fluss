import { createContext, useContext } from "react";
import { HeaderGroup, TableInstance } from "react-table";

export function useDataTable() {
  return useContext(DataTableContext);
}

export type DataTableContextValue<T extends object> = {
  table: TableInstance<T>;
};

const DataTableContext = createContext<DataTableContextValue<any>>({
  table: {} as any,
});

export default DataTableContext;
