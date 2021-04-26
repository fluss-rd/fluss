import { makeStyles } from "@material-ui/core/styles";
import DataTable, { DataTableProps, DataTableProvider } from "../DataTable";

import EnhancedDataTableToolbar, {
  EnhancedDataTableToolbarProps,
} from "./EnhancedDataTableToolbar";

type EnhancedDataTableProps<T extends object> = DataTableProps<T> &
  EnhancedDataTableToolbarProps<T> & { isLoading: boolean };

export default function EnhancedDataTable<T extends object>(props: EnhancedDataTableProps<T>) {
  const classes = useStyles();

  return (
    <DataTableProvider
      columns={props.columns}
      data={props.data}
      paginated={props.paginated}
      pageSize={props.pageSize}
      sortBy={props.sortBy as string}
      sortDirection={props.sortDirection}
      isLoading={props.isLoading}
    >
      <div className={classes.root}>
        <EnhancedDataTableToolbar
          data={props.data}
          withFilters={props.withFilters}
          withSearchBar={props.withSearchBar}
          labeledButtons={props.labeledButtons}
          searchBarWidth={props.searchBarWidth}
          searchBarPlaceholder={props.searchBarPlaceholder}
          withColumnsSelection={props.withColumnsSelection}
        />

        <br />

        <DataTable
          columns={props.columns}
          data={props.data}
          densed={props.densed}
          sortBy={props.sortBy}
          minWidth={props.minWidth}
          pageSize={props.pageSize}
          elevation={props.elevation}
          paginated={props.paginated}
          sortDirection={props.sortDirection}
        />
      </div>
    </DataTableProvider>
  );
}

const useStyles = makeStyles(() => ({
  root: {},
}));

