import { IconButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FilterList, GetApp } from "@material-ui/icons";
import { Ref, useEffect, useRef } from "react";

import SearchBar, { SearchBarRef } from "../../components/SearchBar";
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
        <FilterRows dataTableRef={props.DataTableRef} />
        <ShowColumns DataTableRef={props.DataTableRef} />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
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
