import { makeStyles } from "@material-ui/core/styles";
import { ResponsivePie, ComputedDatum } from "@nivo/pie";
import React, { FC } from "react";
import WqiRating, { ratingToColor, ratingToText } from "../../../../models/WqiRating";

export interface PieChartData {
  id: WqiRating;
  label?: string;
  value: number;
}

interface IcaChartProps {
  data: Array<PieChartData>;
}

function IcaChart<T>(props: IcaChartProps) {
  const { data } = props;

  return (
    <ResponsivePie
      data={data as any}
      arcLinkLabel={(item) => ratingToText(item.id as WqiRating)}
      margin={{ bottom: 30,}}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      colors={(item) => ratingToColor(item.id as WqiRating)}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[]}
    />
  );
}

const useStyles = makeStyles({});

export default IcaChart;

