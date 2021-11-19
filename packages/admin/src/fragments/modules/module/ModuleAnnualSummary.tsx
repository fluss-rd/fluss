import { Card, CardContent, CircularProgress, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useState } from "react";
import ModuleAnnualSummary from "shared/components/ModuleAnnualSummary";
import ParameterName from "shared/models/ParameterName";
import { useGetModuleAnualReport } from "shared/services/monitor/hooks";
import DateMeasure from "shared/models/DateMeasure";
import { ParameterType } from "../../../../../shared/services/monitor/models";

interface ParameterAnnualSummaryProps {
  moduleId: string;
}

const ParameterAnnualSummary: FC<ParameterAnnualSummaryProps> = ({ moduleId }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<ParameterName>("pH");
  const { isLoading, data: moduleAnualReport } = useGetModuleAnualReport(moduleId, {
    refetchOnWindowFocus: true,
    staleTime: 10000,
  });

  const onParameter = (parameter: ParameterName) => {
    setSelected(parameter);
  };

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <ModuleAnnualSummary
      selected={selected}
      onParameter={onParameter}
      summary={getSummaryByParameter(selected, moduleAnualReport)}
      height={400}
      from="2021-07-16"
      to="2021-07-18"
    />
  );
};

const useStyles = makeStyles(() => ({
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
}));

const getSummaryByParameter = function (
  parameter: ParameterName,
  moduleAnualReport: Record<ParameterType, DateMeasure[]>
): DateMeasure[] {
  if (!moduleAnualReport) {
    return [];
  }

  switch (parameter) {
    case "oxygen":
      return moduleAnualReport.do;
    case "pH":
      return moduleAnualReport.ph;
    case "temperature":
      return moduleAnualReport.tmp;
    case "dissolvedSolids":
      return moduleAnualReport.tds;
    case "turbidity":
      return moduleAnualReport.ty;
    default:
      return moduleAnualReport.wqi;
  }
};
export default ParameterAnnualSummary;

