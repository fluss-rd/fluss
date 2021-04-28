import { searchRows } from "../../SearchBar/search";
import { DataTableColumn } from "..";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
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
  paginated?: boolean;
  pageSize?: number;
  isLoading?: boolean;
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
  const [loading, setLoading] = useState(props.isLoading);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  // Update the loading status every time props.isLoading changes.
  useEffect(() => {
    if (props.isLoading) startLoading();
    else stopLoading();
  }, [props.isLoading]);

  return (
    <DataTableContext.Provider
      value={{
        headerGroups,
        sortingColumnId,
        table,
        loading,
        startLoading,
        stopLoading,
      }}
    >
      {props.children}
    </DataTableContext.Provider>
  );
}

DataTableProvider.defaultProps = {
  pageSize: 5,
  paginated: true,
  isLoading: false,
};

function applyInitialState<T extends object>(props: DataTableProviderProps<T>): TableOptions<T> {
  return {
    columns: props.columns as Column<T>[],
    data: props.data === undefined ? [] : props.data,
    initialState: {
      sortBy: [
        {
          id: props.sortBy as string,
          desc: props.sortDirection === "desc" ? true : false,
        },
      ],
      pageIndex: 0,
      pageSize: props.paginated ? props.pageSize : props.data ? props.data.length : 0,
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

