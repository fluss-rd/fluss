/* eslint-disable @typescript-eslint/ban-types */
import { makeStyles, Theme } from "@material-ui/core/styles";
import DataTable, { DataTableProps, DataTableProvider } from "components/Tables/DataTable";

import EnhancedDataTableToolbar, {
  EnhancedDataTableToolbarProps,
} from "./EnhancedDataTableToolbar";

type EnhancedDataTableProps<T extends object> = DataTableProps<T> &
  EnhancedDataTableToolbarProps<T>;

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
    >
      <div className={classes.root}>
        <EnhancedDataTableToolbar {...props} />

        <br />

        <DataTable {...props} />
      </div>
    </DataTableProvider>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));
