import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GetApp } from "@material-ui/icons";
import SearchBar, { SearchBarRef } from "components/SearchBar";
import { GeneralFilter } from "components/Tables";
import { DataTableColumn, useDataTable } from "components/Tables/DataTable";
import { Ref } from "react";

import FilterRows from "./FilterRows";
import ShowColumns from "./ShowColumns";

export interface EnhancedDataTableToolbarProps<T> {
  data?: T[];
  placeholder?: string;
  setData?: (data: T[]) => void;
  SearchBarRef?: Ref<SearchBarRef>;
  DataTableRef?: any;
}

export default function EnhancedDataTableToolbar<T extends object>(
  props: EnhancedDataTableToolbarProps<T>
) {
  const classes = useStyles();
  const { table, startLoading, stopLoading } = useDataTable();

  return (
    <div className={classes.container}>
      <div className={classes.searchBar}>
        <GeneralFilter
          globalFilter={table.state.globalFilter}
          setGlobalFilter={table.setGlobalFilter}
          preGlobalFilteredRows={table.preGlobalFilteredRows}
          placeholder="Buscar..."
          startLoading={startLoading}
          stopLoading={stopLoading}
        />
      </div>

      <div className={classes.actions}>
        <IconButton>
          <GetApp />
        </IconButton>
        <FilterRows table={table} />
        <ShowColumns columns={table.allColumns as DataTableColumn<T>[]} />
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  paper: {},
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  searchBar: {
    width: "50%",
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
}));
