import { makeStyles } from "@material-ui/core/styles";
import { Paper, InputBase, CircularProgress } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { FC, useState } from "react";
import { useDataTable } from "../DataTableContext";
import { useAsyncDebounce, Row } from "react-table";

interface GlobalFilterProps<T extends object> {
  preGlobalFilteredRows: Row<T>[];
  globalFilter: any;
  setGlobalFilter: (value: any) => void;
}

function GlobalFilter<T extends object>(props: GlobalFilterProps<T>) {
  const { table } = useDataTable();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(props.globalFilter);
  const classes = useStyles();
  const applyDebounce = useAsyncDebounce((value) => {
    table.setGlobalFilter(value || undefined);
    setLoading(false);
  }, 200);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setLoading(true);
    setValue(e.target.value);
    applyDebounce(e.target.value);
  };

  return (
    <>
      <Paper className={classes.card}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            {loading ? <CircularProgress color="secondary" size={16} /> : <Search color="action" />}
          </div>
          <InputBase
            placeholder={"Buscar"}
            onChange={onChange}
            value={value || ""}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Paper>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    height: `calc(${theme.mixins.toolbar.minHeight}px - 15px)`,
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(2, 2, 2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default GlobalFilter;

