import { Button, Typography } from "@material-ui/core";
import MeasureReport from "fragments/datos-y-reportes/MeasureReport";
import React, { FC } from "react";

const DataAndReports: FC = () => {
  return (
    <div>
      <Typography variant="h4">Datos y reportes</Typography>

      <MeasureReport />
    </div>
  );
};

export default DataAndReports;
