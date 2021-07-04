import { Typography, Divider } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import DataTable from "shared/components/DataTable";
import SelectColumnFilter from "shared/components/DataTable/filters/SelectColumnFilter";
import DataTableColumn from "shared/components/DataTable/DataTableColumn";

const Test: FC = () => {
  //const [list, setList] = useState([]);
  //const [loading, setLoading] = useState(false);

  //useEffect(changeLoading, []);

  //function changeLoading() {
    //const timer = setTimeout(callback, 3000);

    //function callback() {
      //console.log("hey");
      //setLoading(false);
      //setList(data);
    //}

    //return () => clearTimeout(timer);
  //}

  return (
    <div>
      <Typography variant="h4">Página determinada</Typography>
      <br />
      <DataTable data={data} columns={columns} showGlobalFilter showFilters />
    </div>
  );
};

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

