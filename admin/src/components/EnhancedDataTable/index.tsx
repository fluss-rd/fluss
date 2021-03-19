/* eslint-disable @typescript-eslint/ban-types */
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useRef, useState } from "react";

import DataTable, { DataTableProps } from "../DataTable/DataTable";
import { SearchBarRef } from "../SearchBar";
import EnhancedDataTableToolbar, {
  EnhancedDataTableToolbarProps,
} from "./EnhancedDataTableToolbar";

type EnhancedDataTableProps<T extends object> = DataTableProps<T> &
  EnhancedDataTableToolbarProps<T>;

export default function EnhancedDataTable<T extends object>(props: EnhancedDataTableProps<T>) {
  const classes = useStyles();
  const [filtered, setFiltered] = useState(props.data);
  const searchBarRef = useRef<SearchBarRef | null>(null);

  function handleMatches(matches: T[]) {
    setFiltered(matches);
  }

  function computeData() {
    const current = searchBarRef.current;
    if (current && current.state.keyword.length) return filtered;

    return props.data;
  }

  return (
    <div className={classes.root}>
      <EnhancedDataTableToolbar
        SearchBarRef={searchBarRef}
        data={props.data}
        setData={handleMatches}
      />

      <br />

      <DataTable
        densed={true}
        columns={props.columns}
        data={computeData()}
        sortBy={props.sortBy}
        sortDirection={props.sortDirection}
      />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));
