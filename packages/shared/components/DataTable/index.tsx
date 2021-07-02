/* eslint-disable react/jsx-key */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePaginationProps,
  TableRow,
  TableSortLabel,
  Divider,
} from "@material-ui/core";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import {
  Column,
  Row,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import GlobalFilter from "./filters/GlobalFilter";
import SelectColumnFilter from "./filters/SelectColumnFilter";

import generateId from "../../helpers/generateId";
import DataTableColumn from "./DataTableColumn";
import DataTableContext from "./DataTableContext";
import DataTablePagination from "./DataTablePagination";

interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  data?: T[];
  paginated?: boolean;
  pageSize?: number;
  toolbar?: JSX.Element;
  showGlobalFilter?: boolean;
  showFilters?: boolean;
  sortBy?: keyof T;
  sortDirection?: "asc" | "desc";
  TablePaginationProps?: TablePaginationProps;
  beforeRowRender?: (row: Row<T>) => JSX.Element;
  afterRowRender?: (row: Row<T>) => JSX.Element;
}

function DataTable<T extends object>(props: DataTableProps<T>) {
  const classes = useStyles();
  const table = useTableInitialization(props);
  const rows = props.paginated ? table.page : table.rows;
  const sortBy = table.state.sortBy;
  const sortingColumnId = sortBy?.length > 0 ? sortBy[0].id : "";
  const showToolbar = props.showGlobalFilter || props.toolbar || props.showFilters;

  return (
    <DataTableContext.Provider value={{ table }}>
      <Paper style={{ width: "100%" }}>
        {showToolbar && (
          <div className={classes.toolbar}>
            {props.showGlobalFilter && <GlobalFilter />}
            {props.showGlobalFilter && (props.toolbar || props.showFilters) && (
              <div>
                <Divider
                  orientation="vertical"
                  style={{ height: 28, marginLeft: 4, marginRight: 4 }}
                />
              </div>
            )}

            {props.toolbar}

            {props.showFilters &&
              table.allColumns.map((column) => {
                if (!(column.canFilter && column.Filter)) return null;
                return column.render("Filter");
              })}
          </div>
        )}
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              {table.headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={classes.tableHeader}
                      align="left"
                      padding="default"
                      sortDirection={props.sortDirection}
                    >
                      <TableSortLabel
                        active={sortingColumnId === column.id}
                        direction={column.isSortedDesc ? "desc" : "asc"}
                      >
                        {column.render("Header")}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {rows.map((row) => {
                table.prepareRow(row);
                const before = props.beforeRowRender && props.beforeRowRender(row as any);
                const after = props.afterRowRender && props.afterRowRender(row as any);

                return (
                  <>
                    {before && (
                      <StyledTableRow key={generateId("prev-row")}>
                        <TableCell colSpan={table.allColumns.length}>{before}</TableCell>
                      </StyledTableRow>
                    )}
                    <StyledTableRow {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <TableCell {...cell.getCellProps()} style={{ width: "5%" }}>
                            {cell.render("Cell")}
                          </TableCell>
                        );
                      })}
                    </StyledTableRow>
                    {after && (
                      <StyledTableRow key={generateId("after-row")}>
                        <TableCell colSpan={table.allColumns.length}>{after}</TableCell>
                      </StyledTableRow>
                    )}
                  </>
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

const useStyles = makeStyles((theme) => ({
  table: {},
  tableHeader: {
    fontWeight: "bold",
  },
  separate: {},
  toolbar: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
}));

const StyledTableRow = withStyles((theme: Theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

(DataTable as FC<DataTableProps<any>>).defaultProps = {
  pageSize: 5,
  paginated: true,
  sortBy: "",
  sortDirection: "asc",
};

function useTableInitialization<T extends object>(props: DataTableProps<T>) {
  const { columns, paginated, pageSize, data, sortBy, sortDirection } = props;

  const table = useTable(
    {
      columns: columns as Column<object>[],
      data,
      initialState: {
        pageIndex: 0,
        pageSize: paginated ? pageSize : data.length || 0,
        sortBy: [
          {
            id: sortBy as string,
            desc: sortDirection === "desc" ? true : false,
          },
        ],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return table;
}

export default DataTable;

