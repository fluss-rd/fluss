import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import ModuleAnnualSummary from "shared/components/ModuleAnnualSummary";
import { mockDateMeasures } from "shared/models/DateMeasure";

interface ParameterAnnualSummaryProps {}

const ParameterAnnualSummary: FC<ParameterAnnualSummaryProps> = (props) => {
  const classes = useStyles();
  const summary = mockDateMeasures()[0];

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
          Resumen anual
        </Typography>
      </CardContent>
      <Divider />
      <CardContent style={{ height: 600, width: "fit-parent" }}>
        <ModuleAnnualSummary selected="pH" summary={summary} from="2015-03-01" to="2016-07-12" />
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles({});

export default ParameterAnnualSummary;

