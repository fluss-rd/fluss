import { Card, CardContent, Divider, MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import FormSelect from "shared/components/FormSelect";

import Leyend2 from "./WqiLegend";
import WqiPieChart from "./WqiPieChart";

interface WatershedsSelectCardProps {}

const MonitorPanel: FC<WatershedsSelectCardProps> = (props) => {
  const classes = useStyles();
  const rivers = ["Yaque del Norte", "Otro Determinado"];

  return (
    <div>
      <Card className={classes.card} elevation={0} variant="outlined">
        <CardContent>
          <FormSelect label="Cuerpo hídrico" noneText="Todos" defaultValue="">
            {rivers.map((river) => (
              <MenuItem key={river} value={river}>
                {river}
              </MenuItem>
            ))}
          </FormSelect>
        </CardContent>

        <Divider />
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary" style={{ fontWeight: "bold" }}>
            Índice de Calidad del Agua (ICA)
          </Typography>
          <div style={{ width: "100%", height: 300, marginBottom: -40 }}>
            <WqiPieChart data={data} />
          </div>
        </CardContent>
        <Divider />
        <CardContent>
          <Leyend2 />
        </CardContent>
      </Card>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    width: "fit-content",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    alignItems: "flex-end",
  },
}));

export default MonitorPanel;

const data = [
  {
    id: "elixir",
    label: "elixir",
    value: 268,
    color: "hsl(282, 70%, 50%)",
  },
  {
    id: "stylus",
    label: "stylus",
    value: 54,
    color: "hsl(49, 70%, 50%)",
  },
  {
    id: "erlang",
    label: "erlang",
    value: 224,
    color: "hsl(92, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 162,
    color: "hsl(196, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 539,
    color: "hsl(89, 70%, 50%)",
  },
];
