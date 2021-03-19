import { IconButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FilterList, GetApp } from "@material-ui/icons";
import { Ref } from "react";

import SearchBar, { SearchBarRef } from "../../components/SearchBar";

export interface DataGridToolbarProps<T> {
  data?: T[];
  placeholder?: string;
  setData?: (data: T[]) => void;
  SearchBarRef: Ref<SearchBarRef>;
}

export default function EnhancedDataTableToolbar<T>(props: DataGridToolbarProps<T>) {
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
        <IconButton>
          <FilterList />
        </IconButton>
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
