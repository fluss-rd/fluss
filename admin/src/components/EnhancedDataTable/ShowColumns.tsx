import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Popover,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ViewColumn } from "@material-ui/icons";
import React, { FC, MouseEvent, MutableRefObject, useContext, useEffect, useState } from "react";

import { DataTableRef } from "../DataTable";

interface ShowColumnsProps<T extends object> {
  DataTableRef: MutableRefObject<DataTableRef<T>>;
}

interface CheckboxColumn {
  checked: boolean;
  label: string;
  toggleHidden: () => void;
}

function ShowColumns<T extends object>(props: ShowColumnsProps<T>) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "show-columns" : undefined;
  const [state, setState] = React.useState({} as Record<keyof T, CheckboxColumn>);

  useEffect(fillStateWithColumn, []);

  function fillStateWithColumn() {
    const columns = props.DataTableRef.current.context.allColumns;
    const columnMap = {} as Record<keyof T, CheckboxColumn>;

    for (const column of columns)
      columnMap[column.id as keyof T] = {
        checked: true,
        label: column.Header,
        toggleHidden: column.toggleHidden,
      } as CheckboxColumn;

    setState(columnMap);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.name;
    const checked = event.target.checked;

    const modified: CheckboxColumn = state[id];
    modified.checked = checked;
    modified.toggleHidden();
    setState({ ...state, [id]: modified });
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <ViewColumn />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <Typography variant="body1" className={classes.title}>
              Columnas
            </Typography>
            <FormGroup>
              {Object.keys(state).map((column) => {
                const tableColumn: CheckboxColumn = state[column];
                return (
                  <FormControlLabel
                    key={column}
                    control={
                      <Checkbox
                        checked={tableColumn.checked}
                        name={column}
                        onChange={handleChange}
                      />
                    }
                    label={tableColumn.label}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </div>
      </Popover>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
}));

export default ShowColumns;
