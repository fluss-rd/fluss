import { makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePaginationProps,
} from "@material-ui/core";
import { useTable, Column, usePagination } from "react-table";
import DataTableColumn from "./DataTableColumn";
import DataTableContext from "./DataTableContext";
import DataTablePagination from "./DataTablePagination";

interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  data?: T[];
  paginated?: boolean;
  pageSize?: number;
  TablePaginationProps?: TablePaginationProps;
}

function DataTable<T extends object>(props: DataTableProps<T>) {
  const classes = useStyles();
  const table = useTableInitialization(props);
  const rows = props.paginated ? table.page : table.rows;

  return (
    <DataTableContext.Provider value={{ table }}>
      <Paper style={{ width: "100%" }}>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              {table.headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps()}>{column.render("Header")}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {rows.map((row) => {
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
        <DataTablePagination />
      </Paper>
    </DataTableContext.Provider>
  );
}

const StyledTableRow = withStyles((theme: Theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

(DataTable as FC<DataTableProps<any>>).defaultProps = {
  pageSize: 5,
  paginated: true,
};

function useTableInitialization<T extends object>(props: DataTableProps<T>) {
  const { data, columns } = props;

  const table = useTable(
    {
      columns: columns as Column<object>[],
      data,
      initialState: {
        pageIndex: 0,
        pageSize: props.paginated ? props.pageSize : props.data ? props.data.length : 0,
      },
    },
    usePagination
  );

  return table;
}

export default DataTable;

