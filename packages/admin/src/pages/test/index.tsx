import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import DataTable from "shared/components/DataTable";
import DataTableColumn from "shared/components/DataTable/DataTableColumn";
import GeneralFilter from "shared/components/DataTable/filters/GlobalFilter";

const Test: FC = (props) => {
  return (
    <div>
      <Typography variant="h5"></Typography>
      <DataTable
        data={data}
        columns={columns}
        toolbar={
          <>
            <GeneralFilter />
          </>
        }
      />
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
  },
];

export default Test;

