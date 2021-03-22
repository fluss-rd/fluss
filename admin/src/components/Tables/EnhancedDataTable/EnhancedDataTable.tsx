/* eslint-disable @typescript-eslint/ban-types */
import { makeStyles, Theme } from "@material-ui/core/styles";
import { SearchBarRef } from "components/SearchBar";
import DataTable, {
  DataTableColumn,
  DataTableProps,
  DataTableProvider,
  DataTableRef,
} from "components/Tables/DataTable";
import React, { useEffect, useRef, useState } from "react";

import EnhancedDataTableToolbar, {
  EnhancedDataTableToolbarProps,
} from "./EnhancedDataTableToolbar";

type EnhancedDataTableProps<T extends object> = DataTableProps<T> &
  EnhancedDataTableToolbarProps<T>;

export default function EnhancedDataTable<T extends object>(props: EnhancedDataTableProps<T>) {
  const classes = useStyles();
  const [filtered, setFiltered] = useState(props.data);
  const searchBarRef = useRef<SearchBarRef | null>(null);
  const dataTableRef = useRef<DataTableRef<T> | null>(null);

  function handleMatches(matches: T[]) {
    setFiltered(matches);
  }

  function computeData() {
    const current = searchBarRef.current;
    if (current && current.state.keyword.length) {
      console.log();
      return filtered;
    }

    return props.data;
  }

  return (
    <DataTableProvider columns={props.columns} data={props.data}>
      <div className={classes.root}>
        <EnhancedDataTableToolbar
          SearchBarRef={searchBarRef}
          DataTableRef={dataTableRef}
          data={props.data}
          setData={handleMatches}
        />

        <br />

        <DataTable
          densed={true}
          columns={props.columns as DataTableColumn<any>[]}
          data={computeData()}
          sortBy={props.sortBy}
          sortDirection={props.sortDirection}
          ref={dataTableRef}
        />
      </div>
    </DataTableProvider>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));
