/* eslint-disable @typescript-eslint/ban-types */
import { Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useState } from "react";

import DataTable, { DataGridProps } from "../DataTable";
import EnhancedDataTableToolbar, { DataGridToolbarProps } from "./EnhancedDataTableToolbar";

type EnhancedDataTableProps<T extends object> = DataGridProps<T> & DataGridToolbarProps<T>;

export default function EnhancedDataTable<T extends object>(props: EnhancedDataTableProps<T>) {
  const classes = useStyles();
  const [filtered, setFiltered] = useState([]);

  function handleMatches(matches: T[]) {
    setFiltered(matches);
  }

  return (
    <div className={classes.root}>
      <EnhancedDataTableToolbar data={props.data} setData={handleMatches} />

      <br />

      <DataTable
        densed={true}
        columns={props.columns}
        data={filtered && filtered.length ? filtered : props.data}
        sortBy={props.sortBy}
        sortDirection={props.sortDirection}
      />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));
