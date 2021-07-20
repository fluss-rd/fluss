import { Card, CardContent, CircularProgress, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useState } from "react";
import ModuleAnnualSummary from "shared/components/ModuleAnnualSummary";
import { mockDateMeasures } from "shared/models/DateMeasure";
import DateMeasure from "shared/models/DateMeasure";
import ParameterName from "shared/models/ParameterName";
import { useGetModuleAnualReport } from "shared/services/monitor/hooks";

interface ParameterAnnualSummaryProps {
  moduleId: string;
}

const ParameterAnnualSummary: FC<ParameterAnnualSummaryProps> = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<ParameterName>("pH");

  const summary = mockDateMeasures()[0];

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

  const getSummaryByParameter = function (parameter: ParameterName): DateMeasure[] {
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
          summary={getSummaryByParameter(selected)}
          height={400}
          from="2021-07-16"
          to="2021-07-18"
        />
      </CardContent>
    </Card>
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

export default ParameterAnnualSummary;
