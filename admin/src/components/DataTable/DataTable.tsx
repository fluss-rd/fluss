/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-key */
import { makeStyles, Paper, Table, TableContainer, Theme } from "@material-ui/core";
import React, { FC, forwardRef, useImperativeHandle } from "react";
import { TableInstance } from "react-table";

import { DataTableBody, DataTableColumn, DataTableHead, DataTablePagination } from "../DataTable";
import { useDataTable } from "./DataTableContext";

type Generic<T = any> = T;
export interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  data: T[];
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
  const { table } = useDataTable();

  // The returned object will be used by another component that uses a reference of the table.
  useImperativeHandle(ref, () => ({ context: table }), [table]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            {...table.getTableProps()}
            size={props.densed ? "small" : "medium"}
            className={classes.table}
          >
            <DataTableHead />
            <DataTableBody />
          </Table>
        </TableContainer>
        <DataTablePagination />
      </Paper>
    </div>
  );
});

const useStyles = makeStyles<Theme, DataTableProps<any>>(() => ({
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
}));

(DataTable as FC<DataTableProps<any>>).defaultProps = {
  sortDirection: "asc",
  minWidth: "720px",
};

export default DataTable;
