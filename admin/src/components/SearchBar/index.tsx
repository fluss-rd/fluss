import { Card, CircularProgress, fade, InputBase, Paper } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { ChangeEvent, FC, forwardRef, useEffect, useImperativeHandle } from "react";

import useMergeState from "../../hooks/useMergeState";
import usePrevious from "../../hooks/usePrevious";
import search from "./search";

type SearchBarPropsType<T = any> = SearchBarProps<T>;

interface SearchBarProps<T> {
  placeholder?: string;
  data?: T[];
  setData?: (data: T[]) => void; // Will be executed on searching.
  delay?: number;
}

interface SearchBarState {
  keyword: string;
  timeout: any;
  isLoading: boolean;
}

export interface SearchBarRef {
  state: SearchBarState;
}

const SearchBar = forwardRef<SearchBarRef, SearchBarPropsType>((props, ref) => {
  const classes = useStyles();
  const [current, setCurrent] = useMergeState({
    keyword: "",
    timeout: null,
    isLoading: false,
  });
  const prevKeyword = usePrevious(current.keyword);

  useEffect(searchKeyword, [current.keyword]);

  useImperativeHandle(ref, () => ({ state: current }), [current]);

  function searchKeyword() {
    if (current.keyword === prevKeyword || !props.data || !props.setData) return;

    if (current.keyword.length === 0) {
      props.setData([]);
      if (current.isLoading) setCurrent({ isLoading: false });
      return;
    }

    setCurrent({ isLoading: true });
    const delay = setTimeout(() => {
      const matches = search(props.data, current.keyword);

      setCurrent({ isLoading: false });

      props.setData(matches);
    }, props.delay!);

    return () => clearTimeout(delay);
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (current.timeout) clearTimeout(current.timeout);
    const newKeyword = e.target.value;
    setCurrent({ keyword: newKeyword });
  }

  return (
    <Paper className={classes.card}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          {current.isLoading ? (
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
});

SearchBar.defaultProps = {
  placeholder: "Buscar...",
  delay: 1000,
};

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

export default SearchBar;
