/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-key */
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Theme,
  withStyles,
} from "@material-ui/core";
import React, { ChangeEvent, FC, MouseEvent } from "react";
import { Column, TableOptions, usePagination, useSortBy, useTable } from "react-table";

export type DataGridColumn<T extends object> = { columnWidth?: string } & Column<T>;

export interface DataGridProps<T extends object> {
  columns: DataGridColumn<T>[];
  data: T[];
  densed?: boolean;
  sortBy?: keyof T;
  sortDirection?: "asc" | "desc";
  paginated?: boolean;
  minWidth?: string;
}

function DataTable<T extends object>(props: DataGridProps<T>) {
  const classes = useStyles(props);
  const table = useTable<T>(applyInitialState(props), useSortBy, usePagination);
  const sortingColumnId = table.state.sortBy.length > 0 ? table.state.sortBy[0].id : "";
  const headerGroups = table.headerGroups;

  function handleChangePage(event: MouseEvent<HTMLButtonElement> | null, newPage: number) {
    table.gotoPage(newPage);
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const rowsPerPage = parseInt(event.target.value);
    table.setPageSize(rowsPerPage);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            {...table.getTableProps()}
            size={props.densed ? "small" : "medium"}
            className={classes.table}
          >
            <colgroup>
              {headerGroups.map((headerGroup) =>
                headerGroup.headers.map((column: DataGridColumn<T>, i: number) => (
                  <col style={{ width: column.columnWidth }} key={column.id} />
                ))
              )}
            </colgroup>

            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <TableCell
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        style={{ width: "10%" }}
                      >
                        <TableSortLabel
                          direction={column.isSortedDesc ? "desc" : "asc"}
                          active={sortingColumnId === column.id}
                          className={classes.header}
                        >
                          {column.render("Header")}
                        </TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.page.map((row, i) => {
                table.prepareRow(row);
                return (
                  <StyledTableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()} style={{ width: "5%" }}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={table.rows.length}
          rowsPerPage={table.state.pageSize}
          page={table.state.pageIndex}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function applyInitialState<T extends object>(props: DataGridProps<T>): TableOptions<T> {
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

const useStyles = makeStyles<Theme, DataGridProps<any>>((theme: Theme) => ({
  header: {
    fontWeight: "bold",
    padding: 0,
    margin: 0,
    //width: "fit-content",
  },
  cell: {
    padding: 0,
    margin: 0,
    //width: "fit-content",
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

const StyledTableRow = withStyles((theme: Theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

(DataTable as FC<DataGridProps<any>>).defaultProps = {
  sortDirection: "asc",
  minWidth: "720px",
};

export default DataTable;
