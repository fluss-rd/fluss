import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GetApp } from "@material-ui/icons";
import { GeneralFilter } from "components/Tables";
import { DataTableColumn, useDataTable } from "components/Tables/DataTable";

import FilterRows from "./FilterRows";
import ShowColumns from "./ShowColumns";

export interface EnhancedDataTableToolbarProps<T> {
  data?: T[];
  searchBarPlaceholder?: string;
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
          placeholder={props.searchBarPlaceholder ? props.searchBarPlaceholder : "Buscar..."}
          startLoading={startLoading}
          stopLoading={stopLoading}
        />
      </div>

      <div className={classes.actions}>
        <IconButton>
          <GetApp />
        </IconButton>
        <FilterRows
          key={1729}
          columns={table.allColumns}
          stopLoading={stopLoading}
          startLoading={startLoading}
        />
        <ShowColumns columns={table.allColumns as DataTableColumn<T>[]} key={0} />
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
