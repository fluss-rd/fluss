import { searchRows } from "components/SearchBar/search";
import { DataTableColumn } from "components/Tables";
import { createContext, ReactNode, useContext, useState } from "react";
import {
  Column,
  HeaderGroup,
  IdType,
  Row,
  TableInstance,
  TableOptions,
  useFilters,
  useGlobalFilter,
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
  const table = useTable<T>(
    applyInitialState(props),
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const sortingColumnId = table.state.sortBy.length > 0 ? table.state.sortBy[0].id : "";
  const headerGroups = table.headerGroups as HeaderGroup<T>[];
  const [loading, setLoading] = useState(props.data === undefined ? true : false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <DataTableContext.Provider
      value={{ headerGroups, sortingColumnId, table, loading, startLoading, stopLoading }}
    >
      {props.children}
    </DataTableContext.Provider>
  );
}

function applyInitialState<T extends object>(props: DataTableProviderProps<T>): TableOptions<T> {
  return {
    columns: props.columns as Column<T>[],
    data: props.data === undefined ? [] : props.data,
    initialState: {
      sortBy: [{ id: props.sortBy as string, desc: props.sortDirection === "desc" ? true : false }],
      pageIndex: 0,
      pageSize: 5,
      globalFilter: "",
    },
    globalFilter: customFilter,
  };
}

function customFilter<T extends object>(
  rows: Row<T>[],
  columnIds: IdType<T>[],
  filterValue: string
): Row<T>[] {
  const matches = searchRows(rows, filterValue);
  return matches;
}
export type DataTableContextValue<T extends object> = {
  headerGroups: HeaderGroup<T>[];
  sortingColumnId: string;
  table: TableInstance<T>;
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

const DataTableContext = createContext<DataTableContextValue<any>>({
  headerGroups: [],
  sortingColumnId: "",
  table: {} as any,
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export default DataTableContext;
