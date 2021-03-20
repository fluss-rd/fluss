import { TablePagination } from "@material-ui/core";
import { ChangeEvent, MouseEvent, useContext } from "react";
import { FC } from "react";

import DataTableContext from "./DataTableContext";

export interface DataTablePaginatioProps {
  label?: string;
}

const DataTablePagination: FC<DataTablePaginatioProps> = (props) => {
  const { table } = useContext(DataTableContext);

  function handleChangePage(event: MouseEvent<HTMLButtonElement> | null, newPage: number) {
    table.gotoPage(newPage);
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const rowsPerPage = parseInt(event.target.value);
    table.setPageSize(rowsPerPage);
  }

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      labelRowsPerPage={props.label}
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
  label: "Filas por página",
};

export default DataTablePagination;
