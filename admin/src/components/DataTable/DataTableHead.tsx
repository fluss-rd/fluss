/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/ban-types */
import { makeStyles, TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import { useContext } from "react";

import DataTableColumn from "./DataTableColumn";
import DataTableContext from "./DataTableContext";

export default function DataTableHead<T extends object>() {
  const classes = useStyles();
  const { headerGroups, sortingColumnId } = useContext(DataTableContext);

  return (
    <>
      <colgroup>
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column: DataTableColumn<T>) => (
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
    </>
  );
}

const useStyles = makeStyles({
  header: {
    fontWeight: "bold",
    padding: 0,
    margin: 0,
    //width: "fit-content",
  },
});
