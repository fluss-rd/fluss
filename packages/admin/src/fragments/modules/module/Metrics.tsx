import { Card, CardContent, CardHeader, Divider, Grid } from "@material-ui/core";
import React, { FC } from "react";
import Map from "shared/components/Map";
import ModuleLast24HoursChart from "shared/components/ModuleLast24HoursChart";
import { fromModuleResponse } from "shared/models/Module";
import { useGetModuleInfoById } from "shared/services/modules/hooks";
import { useGetWatershedById } from "shared/services/watersheds/hooks";

import ModuleAnnualSummary from "./ModuleAnnualSummary";

interface MetricsProps {
  moduleId: string;
}

const Metrics: FC<MetricsProps> = ({ moduleId }) => {
  const moduleInfoQuery = useGetModuleInfoById(moduleId);
  const module = fromModuleResponse(moduleInfoQuery.data?.data);
  const watershedQuery = useGetWatershedById(module.watershedId);
  const watershed = watershedQuery?.data;
  const watershedArea = watershed ? watershed.area : undefined;

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Últimas 48 horas" subheader="Gráfico de barras" />
            <Divider />
            <CardContent>
              <ModuleLast24HoursChart barHeight={44} moduleId={moduleId} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Últimas 48 horas" subheader="Gráfico de barras" />
            <Divider />
            <div style={{ height: 300 }}>
              <Map
                focusLocation={watershedArea}
                locations={[module?.location]}
                zoom={12}
                areas={watershedArea && [watershedArea]}
              />
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Resumen anual" subheader="Últimos dos años" />
            <Divider />
            <CardContent>
              <ModuleAnnualSummary moduleId={moduleId} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Metrics;
