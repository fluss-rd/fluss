import { makeStyles, Theme } from "@material-ui/core/styles";
import { FilterList } from "@material-ui/icons";
import PopoverIcon from "components/PopoverIcon";
import React from "react";
import { ColumnInstance } from "react-table";

interface FilterRowsProps<T extends object> {
  columns: ColumnInstance<T>[];
  startLoading?: () => void;
  stopLoading?: () => void;
}

function FilterRows<T extends object>({ columns, startLoading, stopLoading }: FilterRowsProps<T>) {
  const classes = useStyles();

  function renderFilter(column: ColumnInstance<T>) {
    if (!(column.canFilter && column.Filter)) return null;

    return (
      <div key={column.id} className={classes.item}>
        {column.render("Filter", { startLoading, stopLoading })}
      </div>
    );
  }

  return (
    <PopoverIcon title="Filtros" icon={FilterList}>
      <div className={classes.container}>{columns.map(renderFilter)}</div>
    </PopoverIcon>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: 400,
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  item: {
    width: "100%",
  },
}));

export default FilterRows;
