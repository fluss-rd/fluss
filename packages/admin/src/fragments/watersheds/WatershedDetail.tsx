import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
  Slide,
  duration,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import React, { FC } from "react";
import WqiLegend from "shared/components/WqiLegend";
import WqiPieChart, { PieChartData } from "shared/components/WqiPieChart";

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
            action={
              <IconButton aria-label="settings" onClick={close}>
                <Close />
              </IconButton>
            }
          ></CardHeader>
          <Divider />
          <CardContent>
            <Card variant="outlined">
              <CardContent>
                <Typography style={{ fontWeight: "bold" }}>
                  Niveles de contaminación del agua
                </Typography>
              </CardContent>
              <Divider />
              <CardContent style={{ height: 300, width: 400 }}>
                <WqiPieChart data={data} />
              </CardContent>
              <Divider />
              <CardContent>
                <WqiLegend />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Box>
    </Slide>
  );
};

const data: Array<PieChartData> = [
  {
    id: "excellent",
    value: 2,
  },
  {
    id: "moderate",
    value: 2,
  },
  {
    id: "bad",
    value: 2,
  },
];

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  card: {
    borderRadius: 0,
    height: "100%",
  },
});

export default WatershedDetail;

