/* eslint-disable react/jsx-key */
import {
  LinearProgress,
  makeStyles,
  Paper,
  Table,
  TableContainer,
  Theme,
  Typography,
} from "@material-ui/core";
import PanoramaHorizontalIcon from "@material-ui/icons/PanoramaHorizontal";
import React, {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  ReactElement,
  useImperativeHandle,
} from "react";
import { TableInstance } from "react-table";

import usePrevious from "../../../hooks/usePrevious";
import {
  DataTableBody,
  DataTableColumn,
  DataTableHead,
  DataTablePagination,
  useDataTable,
} from ".";

export interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  data?: T[];
  densed?: boolean;
  elevation?: number;
  sortBy?: keyof T;
  sortDirection?: "asc" | "desc";
  paginated?: boolean;
  pageSize?: number;
  minWidth?: string;
}

export interface DataTableRef<T extends object> {
  context: TableInstance<T>;
}

function DataTable<T extends object>(props: DataTableProps<T>, ref: ForwardedRef<DataTableRef<T>>) {
  const classes = useStyles(props);
  const { table, loading } = useDataTable();
  const prevLoading = usePrevious(loading);
  const thereAreElements = props.paginated ? table.page.length === 0 : table.rows.length === 0;
  const dataIsLoading = props.data === undefined;
  const noSearchResults = prevLoading !== loading && thereAreElements;
  const showRows = !dataIsLoading && !noSearchResults && !thereAreElements;

  // The returned object will be used by another component that uses a reference of the table.
  useImperativeHandle(ref, () => ({ context: table }), [table]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={props.elevation}>
        <TableContainer>
          {loading && <LinearProgress color="secondary" />}
          <Table
            {...table.getTableProps()}
            size={props.densed ? "small" : "medium"}
            className={classes.table}
          >
            <DataTableHead useColGroup />
            {showRows && <DataTableBody paginated={props.paginated} />}
          </Table>
        </TableContainer>
        {!showRows && (
          <div className={classes.emptyTable}>
            <PanoramaHorizontalIcon fontSize="large" color="disabled" />
            <Typography variant="caption">
              {noSearchResults ? "No se encontraron resultados" : "Tabla vacía"}
            </Typography>
          </div>
        )}
        {props.paginated && <DataTablePagination />}
      </Paper>
    </div>
  );
}

const useStyles = makeStyles<Theme, DataTableProps<any>>((theme) => ({
  cell: {
    padding: 0,
    margin: 0,
  },
  table: {
    tableLayout: "fixed",
  },
  root: {
    minWidth: ({ minWidth }) => minWidth,
  },
  paper: {
    width: "100%",
  },
  emptyTable: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.palette.grey[500],
    padding: theme.spacing(2),
  },
}));

const ForwardedDataTable = forwardRef(DataTable);

ForwardedDataTable.defaultProps = {
  sortDirection: "asc",
  minWidth: "720px",
  paginated: true,
};

export default ForwardedDataTable as unknown as <T extends object>(
  props: DataTableProps<T> & { ref?: MutableRefObject<DataTableRef<T>> }
) => ReactElement;
