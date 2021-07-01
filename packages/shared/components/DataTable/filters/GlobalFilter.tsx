import { CircularProgress, IconButton, InputBase, Paper, PaperProps } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from "@material-ui/icons";
import clsx from "clsx";
import React, { CSSProperties, FC, useState } from "react";
import { useAsyncDebounce } from "react-table";

import { useDataTable } from "../DataTableContext";

interface GlobalFilterProps {
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  PaperProps?: Partial<PaperProps>;
}

const GlobalFilter: FC<GlobalFilterProps> = (props) => {
  const { table } = useDataTable();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState("");
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
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        {loading ? <CircularProgress color="secondary" size={16} /> : <SearchIcon color="action" />}
      </div>
      <InputBase
        placeholder={props.placeholder}
        value={value}
        onChange={onChange}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
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
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

GlobalFilter.defaultProps = {
  placeholder: "Buscar",
};

export default GlobalFilter;
