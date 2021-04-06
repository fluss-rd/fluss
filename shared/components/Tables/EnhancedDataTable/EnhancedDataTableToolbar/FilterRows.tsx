import { makeStyles, Theme } from "@material-ui/core/styles";
import { FilterList } from "@material-ui/icons";
import PopoverIcon from "../../../PopoverIcon";
import React, { FC } from "react";
import { ColumnInstance } from "react-table";

interface FilterRowsProps<T extends object> {
  columns: ColumnInstance<T>[];
  title?: string;
  labeled?: boolean;
  startLoading?: () => void;
  stopLoading?: () => void;
}

function FilterRows<T extends object>({
  columns,
  startLoading,
  stopLoading,
  title,
  labeled,
}: FilterRowsProps<T>) {
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
    <PopoverIcon title={title} icon={FilterList} labeled={labeled}>
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

(FilterRows as FC).defaultProps = {
  title: "Filtros",
};

export default FilterRows;

