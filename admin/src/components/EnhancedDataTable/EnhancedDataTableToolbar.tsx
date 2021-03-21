import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GetApp } from "@material-ui/icons";
import { Ref } from "react";

import SearchBar, { SearchBarRef } from "../../components/SearchBar";
import { useDataTable } from "../DataTable";
import FilterRows from "./FilterRows";
import ShowColumns from "./ShowColumns";

export interface EnhancedDataTableToolbarProps<T> {
  data?: T[];
  placeholder?: string;
  setData?: (data: T[]) => void;
  SearchBarRef?: Ref<SearchBarRef>;
  DataTableRef?: any;
}

export default function EnhancedDataTableToolbar<T>(props: EnhancedDataTableToolbarProps<T>) {
  const classes = useStyles();
  const table = useDataTable().table;

  return (
    <div className={classes.container}>
      <div className={classes.searchBar}>
        <SearchBar
          data={props.data}
          setData={props.setData}
          placeholder={props.placeholder}
          ref={props.SearchBarRef}
        />
      </div>

      <div className={classes.actions}>
        <IconButton>
          <GetApp />
        </IconButton>
        <FilterRows table={table} />
        <ShowColumns columns={table.allColumns} />
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
