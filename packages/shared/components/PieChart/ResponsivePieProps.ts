import { DefaultRawDatum, PieSvgProps } from "@nivo/pie";

type ResponsivePieProps = Pick<
  PieSvgProps<DefaultRawDatum>,
  | "fill"
  | "tooltip"
  | "data"
  | "animate"
  | "defs"
  | "borderColor"
  | "borderWidth"
  | "margin"
  | "id"
  | "role"
  | "onClick"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
  | "value"
  | "legends"
  | "startAngle"
  | "endAngle"
  | "innerRadius"
  | "theme"
  | "arcLabelsRadiusOffset"
  | "arcLabelsSkipAngle"
  | "arcLabelsTextColor"
  | "arcLabelsComponent"
  | "transitionMode"
  | "component"
  | "arcLinkLabel"
  | "arcLinkLabelsSkipAngle"
  | "arcLinkLabelsOffset"
  | "arcLinkLabelsDiagonalLength"
  | "arcLinkLabelsStraightLength"
  | "arcLinkLabelsThickness"
  | "arcLinkLabelsTextOffset"
  | "arcLinkLabelsTextColor"
  | "arcLinkLabelsColor"
  | "cornerRadius"
  | "padAngle"
  | "valueFormat"
  | "arcLabel"
  | "motionConfig"
  | "isInteractive"
  | "colors"
  | "sortByValue"
  | "fit"
  | "activeInnerRadiusOffset"
  | "activeOuterRadiusOffset"
  | "enableArcLabels"
  | "enableArcLinkLabels"
  | "renderWrapper"
  | "layers"
  | "arcLinkLabelComponent"
>;

export default ResponsivePieProps;
