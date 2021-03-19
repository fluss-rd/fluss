/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-key */
import { makeStyles, Paper, Table, TableContainer, Theme } from "@material-ui/core";
import React, { FC } from "react";
import { HeaderGroup, TableOptions, usePagination, useSortBy, useTable } from "react-table";

import DataTableBody from "./DataTableBody";
import DataTableColumn from "./DataTableColumn";
import DataTableContext from "./DataTableContext";
import DataTableHead from "./DataTableHead";
import DataTablePagination from "./DataTablePagination";

export interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  data: T[];
  densed?: boolean;
  sortBy?: keyof T;
  sortDirection?: "asc" | "desc";
  paginated?: boolean;
  minWidth?: string;
}

function DataTable<T extends object>(props: DataTableProps<T>) {
  const classes = useStyles(props);
  const table = useTable<T>(applyInitialState(props), useSortBy, usePagination);
  const sortingColumnId = table.state.sortBy.length > 0 ? table.state.sortBy[0].id : "";
  const headerGroups = table.headerGroups as HeaderGroup<T>[];

  return (
    <DataTableContext.Provider value={{ headerGroups, sortingColumnId, table }}>
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
    </DataTableContext.Provider>
  );
}

function applyInitialState<T extends object>(props: DataTableProps<T>): TableOptions<T> {
  return {
    columns: props.columns,
    data: props.data,
    initialState: {
      sortBy: [{ id: props.sortBy as string, desc: props.sortDirection === "desc" ? true : false }],
      pageIndex: 0,
      pageSize: 5,
    },
  };
}

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
