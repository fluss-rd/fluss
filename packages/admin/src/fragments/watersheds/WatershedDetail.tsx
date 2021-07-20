import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  duration,
  IconButton,
  Slide,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import React, { FC } from "react";
import PieChart, { PieChartData } from "shared/components/PieChart";
import PieChartLegends from "shared/components/PieChartLegends";
import WqiLegend from "shared/components/WqiLegend";
import ModuleState, { moduleStateToColor, moduleStateToString } from "shared/models/ModuleState";
import WqiRating, { ratingToColor, ratingToText } from "shared/models/WqiRating";
import {
  useGetModuleStatesCount,
  useGetWatershedById,
  useGetWqiRatingsCount,
} from "shared/services/watersheds/hooks";

interface WatershedDetailProps {
  riverId?: string;
  isOpen?: boolean;
  close?: () => void;
}

export const detailWidth = 450;

const WatershedDetail: FC<WatershedDetailProps> = ({ isOpen, close, riverId }) => {
  const classes = useStyles();
  const watershedQuery = useGetWatershedById(riverId);
  const wqiCountQuery = useGetWqiRatingsCount(riverId);
  const statesCountQuery = useGetModuleStatesCount(riverId);

  return (
    <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit timeout={duration.complex}>
      <Box className={classes.root} boxShadow={10}>
        <Card elevation={0} className={classes.card}>
          <CardHeader
            title={watershedQuery.data?.name}
            subheader="Resumen gráfico"
            action={
              <IconButton aria-label="settings" onClick={close}>
                <Close />
              </IconButton>
            }
          />
          <Divider />
          <CardContent>
            <Card variant="outlined">
              <CardContent>
                <Typography style={{ fontWeight: "bold" }}>Niveles de calidad del agua</Typography>
              </CardContent>
              <Divider />
              <CardContent>
                {wqiCountQuery.isSuccess && (
                  <PieChart
                    data={wqiCountQuery?.data}
                    formatOutsideLabel={({ data }) => ratingToText(data)}
                    applyColor={({ data }) => ratingToColor(data)}
                    margin={{ left: 110, right: 110 }}
                    width="100%"
                    height={200}
                  />
                )}
              </CardContent>
              <Divider />
              <CardContent>
                <WqiLegend />
              </CardContent>
            </Card>
            <br />
            <Card variant="outlined">
              <CardContent>
                <Typography style={{ fontWeight: "bold" }}>Total de módulos</Typography>
              </CardContent>
              <Divider />
              <CardContent>
                {statesCountQuery.isSuccess && (
                  <PieChart
                    data={statesCountQuery?.data}
                    margin={20}
                    width="100%"
                    height={200}
                    formatOutsideLabel={({ data }) => moduleStateToString(data)}
                    applyColor={({ data }) => moduleStateToColor(data)}
                  />
                )}
              </CardContent>
              <Divider />
              <CardContent>
                <PieChartLegends
                  data={modulesTotal}
                  label={({ data, ...rest }) => moduleStateToString(data)}
                  color={({ data }) => moduleStateToColor(data)}
                />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Box>
    </Slide>
  );
};

const modulesTotal: Array<PieChartData<ModuleState>> = [
  {
    id: "1",
    data: "active",
    value: 2,
  },
  {
    id: "2",
    data: "inactive",
    value: 2,
  },
  {
    id: "3",
    data: "broken",
    value: 2,
  },
];

const useStyles = makeStyles({
  root: {
    height: "100vh",
    position: "fixed",
    top: 0,
    right: 0,
    width: detailWidth,
  },
  card: {
    borderRadius: 0,
    height: "100%",
    overflow: "auto",
  },
});

export default WatershedDetail;
