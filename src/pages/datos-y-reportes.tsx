import { Typography } from "@material-ui/core";
import React, { FC } from "react";
import { connect, StoreProps } from "../store";

const DataAndReports: FC<StoreProps> = ({ store }) => {
  return (
    <>
      <Typography variant="h4">Datos y reportes</Typography>
      <br />
      <span>{store.counter}</span>
    </>
  );
};

export default connect(DataAndReports);
