import { makeStyles } from "@material-ui/core/styles";
import { Margin } from "@nivo/core";
import { ComputedDatum, ResponsivePie } from "@nivo/pie";
import React from "react";

import ResponsivePieProps from "./ResponsivePieProps";

export interface PieChartProps<T = void> {
  data: PieChartData<T>[];
  margin?: Partial<Margin> | number;
  formatOutsideLabel?: (item: PieChartData<T>, parameters: Omit<PieChartData<T>, "data">) => string; // External label.
  formatInnerLabel?: (item: PieChartData<T>, parameters: Omit<PieChartData<T>, "data">) => string; // External label.
  applyColor?: (item: PieChartData<T>, parameters: Omit<PieChartData<T>, "data">) => string;
  style?: React.CSSProperties;
  className?: string;
  width?: number | string;
  height?: number | string;
  ResponsivePieProps?: Partial<ResponsivePieProps>;
}

export type PieChartData<T = void> = Omit<Partial<ComputedDatum<T>>, "id"> & {
  id: string | number;
};

function PieChart<T>(props: PieChartProps<T>) {
  const computeMargin = (): Partial<Margin> => {
    const { margin } = props;
    if (typeof margin === "number") {
      return { top: margin, bottom: margin, right: margin, left: margin };
    }

    return margin;
  };

  return (
    <div
      style={{ ...props.style, width: props.width, height: props.height }}
      className={props.className}
    >
      <ResponsivePie
        data={props.data as any}
        arcLabel={
          props.formatInnerLabel
            ? ({ data, ...rest }) => props.formatInnerLabel(data as PieChartData<T>, rest)
            : undefined
        }
        arcLinkLabel={
          props.formatOutsideLabel
            ? ({ data, ...rest }) => props.formatOutsideLabel(data as PieChartData<T>, rest)
            : undefined
        }
        colors={
          props.applyColor
            ? ({ data, ...rest }) => props.applyColor(data as PieChartData<T>, rest)
            : undefined
        }
        margin={computeMargin()}
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
        {...(props.ResponsivePieProps as any)}
      />
    </div>
  );
}

const useStyles = makeStyles({});

export default PieChart;

