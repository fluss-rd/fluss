import { DataTableColumn } from "components/DataTable";
import { createContext, ReactNode, useContext } from "react";
import {
  Column,
  HeaderGroup,
  TableInstance,
  TableOptions,
  useFilters,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export function useDataTable() {
  return useContext(DataTableContext);
}

export interface DataTableProviderProps<T extends object> {
  children: ReactNode;
  columns: DataTableColumn<T>[];
  data?: T[];
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

export function DataTableProvider<T extends object>(props: DataTableProviderProps<T>) {
  const table = useTable<T>(applyInitialState(props), useFilters, useSortBy, usePagination);
  const sortingColumnId = table.state.sortBy.length > 0 ? table.state.sortBy[0].id : "";
  const headerGroups = table.headerGroups as HeaderGroup<T>[];

  return (
    <DataTableContext.Provider value={{ headerGroups, sortingColumnId, table }}>
      {props.children}
    </DataTableContext.Provider>
  );
}

function applyInitialState<T extends object>(props: DataTableProviderProps<T>): TableOptions<T> {
  return {
    columns: props.columns as Column<T>[],
    data: props.data,
    initialState: {
      sortBy: [{ id: props.sortBy as string, desc: props.sortDirection === "desc" ? true : false }],
      pageIndex: 0,
      pageSize: 5,
    },
  };
}

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
