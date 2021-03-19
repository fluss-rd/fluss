/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-key */
import { TableBody, TableCell, TableRow, Theme, withStyles } from "@material-ui/core";
import { useContext } from "react";

import DataTableContext from "./DataTableContext";

export default function DataTableBody() {
  const { table } = useContext(DataTableContext);

  return (
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
  );
}

const StyledTableRow = withStyles((theme: Theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
