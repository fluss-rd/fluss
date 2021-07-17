import { Card, CardContent, CardHeader, Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useState } from "react";
import Map from "shared/components/Map";
import ModuleAnnualSummary from "shared/components/ModuleAnnualSummary";
import ModuleLast24HoursChart from "shared/components/ModuleLast24HoursChart";
import { mockDateMeasures } from "shared/models/DateMeasure";
import ParameterName from "shared/models/ParameterName";

interface MetricsProps {}

const Metrics: FC<MetricsProps> = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<ParameterName>("pH");
  const summary = mockDateMeasures()[0];

  const onParameter = (parameter: ParameterName) => {
    setSelected(parameter);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Últimas 48 horas" subheader="Gráfico de barras" />
            <Divider />
            <CardContent>
              <ModuleLast24HoursChart barHeight={44} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Últimas 48 horas" subheader="Gráfico de barras" />
            <Divider />
            <div style={{ height: 300 }}>
              <Map />
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Resumen anual" subheader="Últimos dos años" />
            <Divider />
            <CardContent>
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
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles({});

export default Metrics;
