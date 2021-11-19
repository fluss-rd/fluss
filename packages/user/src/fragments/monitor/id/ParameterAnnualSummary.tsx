import { Card, CardContent, Divider, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useState } from "react";
import ModuleAnnualSummary from "shared/components/ModuleAnnualSummary";
import ParameterName from "shared/models/ParameterName";
import { useGetModuleAnualReport } from "shared/services/monitor/hooks";
import DateMeasure from "shared/models/DateMeasure";
import { ParameterType } from "shared/services/monitor/models";

interface ParameterAnnualSummaryProps {
  moduleId: string;
}

const ParameterAnnualSummary: FC<ParameterAnnualSummaryProps> = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<ParameterName>("pH");
  const moduleId = props.moduleId;
  const { isLoading, data: moduleAnualReport } = useGetModuleAnualReport(moduleId);

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
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
          Resumen anual
        </Typography>
      </CardContent>
      <Divider />
      <CardContent style={{ width: "fit-parent" }}>
        <ModuleAnnualSummary
          selected={selected}
          onParameter={onParameter}
          summary={getSummaryByParameter(selected, moduleAnualReport as any)}
          height={400}
          from="2021-07-16"
          to="2021-07-18"
        />
      </CardContent>
    </Card>
  );
};

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

const useStyles = makeStyles(() => ({
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
}));

export default ParameterAnnualSummary;

