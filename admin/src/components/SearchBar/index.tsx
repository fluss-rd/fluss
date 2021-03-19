import { Card, CircularProgress, fade, InputBase, Paper } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { ChangeEvent, FC, useEffect } from "react";

import useMergeState from "../../hooks/useMergeState";
import usePrevious from "../../hooks/usePrevious";

type SearchBarPropsType<T = any> = SearchBarProps<T>;

interface SearchBarProps<T> {
  placeholder?: string;
  data?: T[];
  setData?: (data: T[]) => void; // Will be executed on searching.
  delay?: number;
}

const SearchBar: FC<SearchBarPropsType> = (props) => {
  const classes = useStyles();
  const [current, setCurrent] = useMergeState({
    keyword: "",
    timeout: null,
    isLoading: false,
  });
  const prevKeyword = usePrevious(current.keyword);

  useEffect(searchKeyword, [current.keyword]);

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
      console.log(matches);

      setCurrent({ isLoading: false });
      props.setData(matches);
    }, props.delay!);

    return () => clearTimeout(delay);
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (current.timeout) clearTimeout(current.timeout);
    setCurrent({ keyword: e.target.value });
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
};

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

function search<T>(data: T[], keyword: string): T[] {
  const matches = data.filter((element: T) => {
    const normalizedKeyword: string = normalizeText(keyword);
    const normalizedContent: string = normalizeText(objToString(element));
    const thereIsAMatch = normalizedContent.includes(normalizedKeyword);
    return thereIsAMatch;
  });

  return matches;
}

function objToString<T>(obj: T): string {
  const str = Object.keys(obj)
    .map((key) => obj[key])
    .join(" ");

  return str;
}

function normalizeText(text: string): string {
  const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const lowerCased = normalized.toLowerCase();
  return lowerCased;
}
