import { makeStyles } from "@material-ui/core/styles";
import React, { FC, Fragment } from "react";
import { useDataTable } from "./DataTableContext";

interface DataTableFiltersProps {}

const DataTableFilters: FC<DataTableFiltersProps> = (props) => {
  const classes = useStyles();
  const { table } = useDataTable();

  return (
    <div>
      {table.allColumns.map((column) => {
        if (!column.filter) return null;
        return <Fragment key={column.id}>{column.render("Filter")}</Fragment>;
      })}
    </div>
  );
};

const useStyles = makeStyles({});

export default DataTableFilters;

