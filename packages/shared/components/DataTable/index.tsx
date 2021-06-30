import { makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useTable, Column } from "react-table";
import DataTableColumn from "./DataTableColumn";

interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  data?: T[];
}

function DataTable<T extends object>(props: DataTableProps<T>) {
  const { columns, data } = props;
  const classes = useStyles();
  const table = useTable({ columns: columns as Column<T>[], data });

  return (
    <TableContainer component={Paper}>
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
          {table.rows.map((row) => {
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

export default DataTable;

