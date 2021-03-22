/* eslint-disable @typescript-eslint/ban-types */
import { makeStyles, Theme } from "@material-ui/core/styles";
import DataTable, {
  DataTableColumn,
  DataTableProps,
  DataTableProvider,
} from "components/Tables/DataTable";

import EnhancedDataTableToolbar, {
  EnhancedDataTableToolbarProps,
} from "./EnhancedDataTableToolbar";

type EnhancedDataTableProps<T extends object> = DataTableProps<T> &
  EnhancedDataTableToolbarProps<T>;

export default function EnhancedDataTable<T extends object>(props: EnhancedDataTableProps<T>) {
  const classes = useStyles();

  return (
    <DataTableProvider columns={props.columns} data={props.data}>
      <div className={classes.root}>
        <EnhancedDataTableToolbar data={props.data} />

        <br />

        <DataTable
          densed={true}
          columns={props.columns as DataTableColumn<any>[]}
          data={props.data}
          sortBy={props.sortBy}
          sortDirection={props.sortDirection}
        />
      </div>
    </DataTableProvider>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));
