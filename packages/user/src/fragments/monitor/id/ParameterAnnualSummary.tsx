import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useState } from "react";
import ModuleAnnualSummary from "shared/components/ModuleAnnualSummary";
import ParameterName from "shared/models/ParameterName";
import { mockDateMeasures } from "shared/models/DateMeasure";

interface ParameterAnnualSummaryProps {}

const ParameterAnnualSummary: FC<ParameterAnnualSummaryProps> = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<ParameterName>("pH");
  const summary = mockDateMeasures()[0];

  const onParameter = (parameter: ParameterName) => {
    setSelected(parameter);
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
          summary={summary}
          height={400}
          from="2015-03-01"
          to="2016-07-12"
        />
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles({});

export default ParameterAnnualSummary;

