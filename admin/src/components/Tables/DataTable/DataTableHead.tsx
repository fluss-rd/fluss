/* eslint-disable react/jsx-key */
import { makeStyles, TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import { useContext } from "react";
import { ColumnInstance } from "react-table";

import DataTableColumn from "./DataTableColumn";
import DataTableContext from "./DataTableContext";

interface DataTableHeadProps {
  useColGroup?: boolean;
}

export default function DataTableHead<T extends object>(props: DataTableHeadProps) {
  const classes = useStyles();
  const { headerGroups, sortingColumnId } = useContext(DataTableContext);

  return (
    <>
      {props.useColGroup && (
        <colgroup>
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column: ColumnInstance<T>) => (
              <col style={{ width: (column as DataTableColumn<T>).columnWidth }} key={column.id} />
            ))
          )}
        </colgroup>
      )}

      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: DataTableColumn<T>) => {
              return (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={classes.cell}
                >
                  <TableSortLabel
                    direction={column.isSortedDesc ? "desc" : "asc"}
                    active={sortingColumnId === column.id}
                    className={classes.header}
                  >
                    <div className={classes.render} style={column.columnTitleStyles}>
                      {column.render("Header")}
                    </div>
                  </TableSortLabel>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableHead>
    </>
  );
}

const useStyles = makeStyles({
  cell: {},
  header: {
    fontWeight: "bold",
    width: "100%",
  },
  render: {
    width: "100%",
  },
});
