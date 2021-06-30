import React, { FC, MouseEvent, ChangeEvent } from "react";
import { TablePagination } from "@material-ui/core";
import { useDataTable } from "./DataTableContext";

type DataTablePaginationProps = {
  labelRowsPerPage?: string;
  rowsPerPageOptions?: number[];
};

const DataTablePagination: FC<DataTablePaginationProps> = (props) => {
  const { table } = useDataTable();

  function handleChangePage(_: MouseEvent<HTMLButtonElement> | null, newPage: number) {
    table.gotoPage(newPage);
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const rowsPerPage = parseInt(event.target.value);
    table.setPageSize(rowsPerPage);
  }

  return (
    <TablePagination
      rowsPerPageOptions={props.rowsPerPageOptions}
      labelRowsPerPage={props.labelRowsPerPage}
      component="div"
      count={table.rows.length}
      rowsPerPage={table.state.pageSize}
      page={table.state.pageIndex}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

DataTablePagination.defaultProps = {
  labelRowsPerPage: "Filas por página",
  rowsPerPageOptions: [5, 10, 25],
};

export default DataTablePagination;

