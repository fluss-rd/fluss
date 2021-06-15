import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ResponsiveBar } from "@nivo/bar";
import React, { FC } from "react";
import { mockParameterMeasures } from "models/parameter-measures";

interface ModuleMarkerPreviewChartProps {}

const ModuleMarkerPreviewChart: FC<ModuleMarkerPreviewChartProps> = (props) => {
  const classes = useStyles();
  const measures = mockParameterMeasures();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Typography variant="body1" style={{ fontWeight: "bold" }}>
        Últimas 48 horas
      </Typography>
      <table>
        <tr>
          <td></td>
          <td style={{ textAlign: "center" }}>Lunes</td>
          <td style={{ textAlign: "center" }}>Martes</td>
        </tr>
        {measures.map((measure) => (
          <tr key={measure.parameterName}>
            <td>
              <Typography variant="caption">{measure.parameterName}</Typography>
            </td>
            {measure.measures.map((m) => (
              <td key={m.day} style={{ height: 50, width: "50%" }}>
                <ResponsiveBar data={m.measures} keys={["level"]} indexBy="hour" />
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

const useStyles = makeStyles({});

export default ModuleMarkerPreviewChart;

