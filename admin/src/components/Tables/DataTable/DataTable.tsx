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
import usePrevious from "hooks/usePrevious";
import React, { FC, forwardRef, useImperativeHandle } from "react";
import { TableInstance } from "react-table";

import {
  DataTableBody,
  DataTableColumn,
  DataTableHead,
  DataTablePagination,
  useDataTable,
} from ".";

type Generic<T = any> = T;
export interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  data?: T[];
  densed?: boolean;
  sortBy?: keyof T;
  sortDirection?: "asc" | "desc";
  paginated?: boolean;
  minWidth?: string;
}

export interface DataTableRef<T extends object> {
  context: TableInstance<T>;
}

const DataTable = forwardRef<DataTableRef<Generic>, DataTableProps<Generic>>((props, ref) => {
  const classes = useStyles(props);
  const { table, loading } = useDataTable();
  const prevLoading = usePrevious(loading);

  // The returned object will be used by another component that uses a reference of the table.
  useImperativeHandle(ref, () => ({ context: table }), [table]);

  const dataIsLoading = props.data === undefined;
  const thereIsNoResults = prevLoading !== loading && table.page.length === 0;
  const thereIsNoData = table.page.length === 0;
  const showRows = !dataIsLoading && !thereIsNoResults && !thereIsNoData;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          {(loading || props.data === undefined) && <LinearProgress color="secondary" />}
          <Table
            {...table.getTableProps()}
            size={props.densed ? "small" : "medium"}
            className={classes.table}
          >
            <DataTableHead useColGroup />
            {showRows && <DataTableBody />}
          </Table>
        </TableContainer>
        {!showRows && (
          <div className={classes.emptyTable}>
            <PanoramaHorizontalIcon fontSize="large" color="disabled" />
            <Typography variant="caption">
              {thereIsNoResults ? "No se encontraron resultados" : "Tabla vacía"}
            </Typography>
          </div>
        )}
        <DataTablePagination />
      </Paper>
    </div>
  );
});

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

(DataTable as FC<DataTableProps<any>>).defaultProps = {
  sortDirection: "asc",
  minWidth: "720px",
};

export default DataTable;
