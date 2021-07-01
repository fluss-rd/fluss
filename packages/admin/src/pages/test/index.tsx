import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import DataTable from "shared/components/DataTable";
import DataTableColumn from "shared/components/DataTable/DataTableColumn";
import SelectColumnFilter from "shared/components/DataTable/filters/SelectColumnFilter";

const Test: FC = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4">Página determinada</Typography>
      <br />
      <DataTable data={data} columns={columns} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  divider: {
    height: 28,
    margin: 4,
  },
}));

type Data = {
  col1: string;
  col2: string;
};

const data: Data[] = [
  {
    col1: "Hello",
    col2: "World",
  },
  {
    col1: "react-table",
    col2: "rocks",
  },
  {
    col1: "whatever",
    col2: "you want",
  },
  {
    col1: "Hello",
    col2: "World",
  },
  {
    col1: "react-table",
    col2: "rocks",
  },
  {
    col1: "whatever",
    col2: "you want",
  },
];

const columns: DataTableColumn<Data>[] = [
  {
    Header: "Column 1",
    accessor: "col1", // accessor is the "key" in the data
  },
  {
    Header: "Column 2",
    accessor: "col2",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
];

export default Test;
