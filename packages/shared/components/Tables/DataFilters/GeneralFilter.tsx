import { CircularProgress, InputBase, Paper } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { ChangeEvent, useEffect } from "react";
import { Row } from "react-table";

import { useMergeState, usePrevious } from "../../../hooks";

interface GeneralFilterProps<T extends object> {
  preGlobalFilteredRows: Row<T>[];
  globalFilter: any;
  setGlobalFilter: (value: any) => void;
  placeholder?: string;
  delay?: number;
  startLoading?: () => void;
  stopLoading?: () => void;
}

function GeneralFilter<T extends object>(props: GeneralFilterProps<T>) {
  const classes = useStyles();
  const count = props.preGlobalFilteredRows.length;
  const [current, setCurrent] = useMergeState({
    keyword: props.globalFilter || "",
    loading: false,
  });
  const prevKeyword = usePrevious(current.keyword);

  useEffect(searchKeyword, [current.keyword]);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const newKeyword = e.target.value;
    setCurrent({ keyword: newKeyword });
  }

  function searchKeyword() {
    if (current.keyword === prevKeyword || count === 0) return;

    if (current.keyword.length === 0) {
      props.setGlobalFilter("");
      if (current.loading) {
        setCurrent({ loading: false });
        if (props.startLoading) props.stopLoading();
      }
      return;
    }

    if (props.startLoading) props.startLoading();
    setCurrent({ loading: true });
    const delay = setTimeout(() => {
      props.setGlobalFilter(current.keyword); // search
      setCurrent({ loading: false });
      if (props.startLoading) props.stopLoading();
    }, props.delay!);

    return () => clearTimeout(delay);
  }

  return (
    <Paper className={classes.card}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          {current.loading ? (
            <CircularProgress color="secondary" size={16} />
          ) : (
            <SearchIcon color="action" />
          )}
        </div>
        <InputBase
          placeholder={props.placeholder}
          onChange={handleChange}
          value={current.keyword}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </Paper>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

GeneralFilter.defaultProps = {
  delay: 500,
};

export default GeneralFilter;
