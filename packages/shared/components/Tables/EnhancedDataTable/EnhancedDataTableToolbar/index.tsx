import { makeStyles, Theme } from "@material-ui/core/styles";

import { GeneralFilter } from "../../";
import { DataTableColumn, useDataTable } from "../../DataTable";
import FilterRows from "./FilterRows";
import ShowColumns from "./ShowColumns";

export interface EnhancedDataTableToolbarProps<T> {
  data?: T[];
  searchBarPlaceholder?: string;
  searchBarWidth?: string | number;
  withFilters?: boolean;
  withColumnsSelection?: boolean;
  withSearchBar?: boolean;
  labeledButtons?: boolean;
}

function EnhancedDataTableToolbar<T extends object>(props: EnhancedDataTableToolbarProps<T>) {
  const classes = useStyles(props);
  const { table, startLoading, stopLoading } = useDataTable();

  return (
    <div className={classes.container}>
      <div className={classes.searchBar}>
        {props.withSearchBar && (
          <GeneralFilter
            globalFilter={table.state.globalFilter}
            setGlobalFilter={table.setGlobalFilter}
            preGlobalFilteredRows={table.preGlobalFilteredRows}
            placeholder={props.searchBarPlaceholder ? props.searchBarPlaceholder : "Buscar..."}
            startLoading={startLoading}
            stopLoading={stopLoading}
          />
        )}
      </div>

      <div className={classes.actions}>
        <span>Hey</span>
        {props.withFilters && (
          <FilterRows
            key={1729}
            columns={table.allColumns}
            stopLoading={stopLoading}
            startLoading={startLoading}
            labeled={props.labeledButtons}
          />
        )}
        {props.withColumnsSelection && (
          <ShowColumns columns={table.allColumns} labeled={props.labeledButtons} key={0} />
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles<Theme, EnhancedDataTableToolbarProps<any>>((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    },
    searchBar: {
      width: ({ withFilters, withColumnsSelection, searchBarWidth }) => {
        if (searchBarWidth !== undefined) return searchBarWidth;

        if (!withFilters && !withColumnsSelection) return "100%";
        else if (withFilters || withColumnsSelection) return "70%";
        else return "50";
      },
      [theme.breakpoints.down("lg")]: {
        width: "100%",
      },
    },
    actions: {
      display: "flex",
      alignItems: "center",
    },
  };
});

EnhancedDataTableToolbar.defaultProps = {
  withSearchBar: true,
};

export default EnhancedDataTableToolbar;
