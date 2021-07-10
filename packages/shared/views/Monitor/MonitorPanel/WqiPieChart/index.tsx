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
  const sideMargin = data.length === 1 ? 0 : data.length === 2 ? 100 : 80;

  return (
    <ResponsivePie
      data={data as any}
      arcLinkLabel={(item) => ratingToText(item.id as WqiRating)}
      margin={{ top: 0, bottom: 0, left: sideMargin, right: sideMargin }}
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
    />
  );
}

const useStyles = makeStyles({});

export default IcaChart;

