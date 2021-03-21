import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FilterList } from "@material-ui/icons";
import React, { FC, MutableRefObject, useEffect, useState } from "react";
import { ColumnInstance } from "react-table";

import { DataTableRef } from "../DataTable";
import PopoverIcon from "../PopoverIcon";

interface FilterRowsProps<T extends object> {
  dataTableRef: MutableRefObject<DataTableRef<T>>;
}

function FilterRows<T extends object>(props: FilterRowsProps<T>) {
  const classes = useStyles();
  const [columns, setColumns] = useState<ColumnInstance<T>[]>([]);

  useEffect(addFilters, []);

  function addFilters() {
    const tableColumns = props.dataTableRef.current.context.allColumns;
    setColumns(tableColumns);
  }

  return (
    <PopoverIcon title="FILTROS" icon={FilterList}>
      <div className={classes.container}>
        {columns.map((column: ColumnInstance<T>) =>
          column.canFilter && column.Filter ? (
            <div key={column.id} className={classes.item}>
              {column.render("Filter")}
            </div>
          ) : null
        )}
      </div>
    </PopoverIcon>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: 400,
    display: "flex",
    flexDirection: "column",
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  item: {
    width: "100%",
  },
}));

export default FilterRows;
