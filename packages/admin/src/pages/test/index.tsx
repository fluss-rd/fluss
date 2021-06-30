import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import DataTable from "shared/components/DataTable";
import DataTableColumn from "shared/components/DataTable/data-table-column";

const Test: FC = (props) => {
  const data = React.useMemo(
    () => [
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
    ],
    []
  );
  const columns = React.useMemo(
    () =>
      [
        {
          Header: "Column 1",
          accessor: "col1", // accessor is the "key" in the data
        },
        {
          Header: "Column 2",
          accessor: "col2",
        },
      ] as DataTableColumn<{ col1: string; col2: string }>[],
    []
  );

  return (
    <div>
      <Typography variant="h5"></Typography>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default Test;

