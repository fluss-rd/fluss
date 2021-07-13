import { makeStyles } from "@material-ui/core/styles";
import { ResponsivePie, ComputedDatum } from "@nivo/pie";
import React, { FC } from "react";
import { Margin } from "@nivo/core";
import ResponsivePieProps from "./ResponsivePieProps";

export interface PieChartProps<T> {
  data: PieChartData<T>[];
  margin?: Margin | number;
  formatOutsideLabel?: (item: PieChartData<T>) => string; // External label.
  formatInnerLabel?: (item: PieChartData<T>) => string; // External label.
  applyColor?: (item: PieChartData<T>) => string;
  style?: React.CSSProperties;
  className?: string;
  width?: number | string;
  height?: number | string;
  ResponsivePieProps?: Partial<ResponsivePieProps>
}

export type PieChartData<T> = Partial<ComputedDatum<T>>;

function PieChart<T>(props: PieChartProps<T>) {
  const classes = useStyles();

  function computeMargin(): Margin {
    const { margin } = props;
    if (typeof margin === "number") {
      return { top: margin, bottom: margin, right: margin, left: margin };
    }

    return margin;
  }

  return (
    <div
      style={{ ...props.style, width: props.width, height: props.height }}
      className={props.className}
    >
      <ResponsivePie
        data={props.data as any}
        enableArcLabels={false}
        arcLabel={props.formatInnerLabel}
        arcLinkLabel={props.formatOutsideLabel}
        margin={computeMargin()}
        colors={props.applyColor}
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
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        {...props.ResponsivePieProps as any}
      />
    </div>
  );
}

const useStyles = makeStyles({});

export default PieChart;

