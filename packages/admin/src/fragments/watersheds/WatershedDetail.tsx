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

interface WatershedDetailProps {
  isOpen?: boolean;
  close?: () => void;
}

const WatershedDetail: FC<WatershedDetailProps> = ({ isOpen, close }) => {
  const classes = useStyles();

  return (
    <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit timeout={duration.complex}>
      <Box className={classes.root} boxShadow={10}>
        <Card elevation={0} className={classes.card}>
          <CardHeader
            title="Río Yaque del Norte"
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
                <Typography style={{ fontWeight: "bold" }}>
                  Niveles de contaminación del agua
                </Typography>
              </CardContent>
              <Divider />
              <CardContent>
                <PieChart
                  data={data}
                  formatOutsideLabel={({ data }) => ratingToText(data)}
                  applyColor={({ data }) => ratingToColor(data)}
                  margin={{ left: 110, right: 110 }}
                  width="100%"
                  height={200}
                />
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
                <PieChart
                  data={modulesTotal}
                  margin={20}
                  width="100%"
                  height={200}
                  formatOutsideLabel={({ data }) => moduleStateToString(data)}
                  applyColor={({ data }) => moduleStateToColor(data)}
                />
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

const data: Array<PieChartData<WqiRating>> = [
  {
    id: "excellent",
    value: 2,
    data: "excellent",
  },
  {
    id: "moderate",
    value: 2,
    data: "moderate",
  },
];

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
    overflow: "auto",
  },
  card: {
    borderRadius: 0,
    height: "100%",

    overflow: "auto",
  },
});

export default WatershedDetail;
