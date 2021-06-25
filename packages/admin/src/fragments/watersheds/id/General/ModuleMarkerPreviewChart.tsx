import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ResponsiveBar } from "@nivo/bar";
import { mockParameterMeasures } from "models/parameter-measures";
import React, { FC } from "react";

interface ModuleMarkerPreviewChartProps {}

const ModuleMarkerPreviewChart: FC<ModuleMarkerPreviewChartProps> = (props) => {
  const classes = useStyles();
  const measures = mockParameterMeasures();

  return (
    <div>
      <Typography variant="body1" style={{ fontWeight: "bold" }}>
        Últimas 48 horas
      </Typography>
      <table style={{ width: "100%" }}>
        <tr>
          <td></td>
          <td style={{ textAlign: "center" }}>Lunes</td>
          <td style={{ textAlign: "center" }}>Martes</td>
          <td style={{ textAlign: "center" }}>Max</td>
          <td style={{ textAlign: "center" }}>Min</td>
        </tr>
        {measures.map((measure) => (
          <tr key={measure.parameterName}>
            <td>
              <Typography variant="caption">{measure.parameterName}</Typography>
            </td>
            {measure.measures.map((m) => (
              <td key={m.day}>
                <div style={{ height: 30, minWidth: 100 }}>
                  <ResponsiveBar
                    colors={measure.color}
                    data={m.measures}
                    keys={["level"]}
                    indexBy="hour"
                    innerPadding={0.4}
                    enableLabel={false}
                    enableGridY={false}
                  />
                </div>
              </td>
            ))}
            <td style={{ textAlign: "center" }}>
              <Typography variant="caption" color="primary">
                {measure.max}
              </Typography>
            </td>
            <td style={{ textAlign: "center" }}>
              <Typography variant="caption" color="secondary">
                {measure.min}
              </Typography>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

const useStyles = makeStyles({});

export default ModuleMarkerPreviewChart;

