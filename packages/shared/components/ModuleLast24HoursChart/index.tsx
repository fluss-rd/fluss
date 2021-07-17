import { Typography } from "@material-ui/core";
import { ResponsiveBar } from "@nivo/bar";
import React, { FC } from "react";
import { mockParameterMeasures } from "shared/models/ParameterMeasures";

interface ModuleLast24HoursChartProps {
  barHeight?: number;
}

const ModuleLast24HoursChart: FC<ModuleLast24HoursChartProps> = (props) => {
  const measures = mockParameterMeasures();

  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <td></td>
            <td style={{ textAlign: "center" }}>Lunes</td>
            <td style={{ textAlign: "center" }}>Martes</td>
            <td style={{ textAlign: "center" }}>Max</td>
            <td style={{ textAlign: "center" }}>Min</td>
          </tr>
        </thead>
        <tbody>
          {measures.map((measure) => (
            <tr key={measure.parameterName}>
              <td>
                <Typography variant="caption">{measure.parameterName}</Typography>
              </td>
              {measure.measures.map((m) => (
                <td key={m.day}>
                  <div style={{ height: props.barHeight, minWidth: 100 }}>
                    <ResponsiveBar
                      colors={measure.color}
                      data={m.measures}
                      keys={["value"]}
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
        </tbody>
      </table>
    </div>
  );
};

ModuleLast24HoursChart.defaultProps = {
  barHeight: 30,
};
export default ModuleLast24HoursChart;
