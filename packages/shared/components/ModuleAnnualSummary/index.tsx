import { ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CalendarDatum, ResponsiveCalendar } from "@nivo/calendar";
import React, { FC, useState, DetailedHTMLProps } from "react";
import SelectButton from "./SelectButton";
import ParameterName, { parameters, toString } from "../../models/ParameterName";

export interface ModuleAnnualSummaryProps {
  selected: ParameterName;
  summary: Array<CalendarDatum>;
  from: string; // Start date.
  to: string; // Finish date.
  width?: string | number;
  height?: string | number;
  onParameter?: (name: ParameterName) => void;
  ChartDivProps?: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

const ModuleAnnualSummary: FC<ModuleAnnualSummaryProps> = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);

  const onParameterChange = (index: number) => {
    setSelected(index);

    if (props.onParameter) {
      props.onParameter(parameters[index]);
    }
  };

  return (
    <div>
      <div className={classes.buttons}>
        <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
          {parameters.map((parameter, i) => (
            <SelectButton key={parameter} index={i} value={selected} onClick={onParameterChange}>
              {toString(parameter)}
            </SelectButton>
          ))}
        </ButtonGroup>
      </div>

      <br />

      <div style={{ width: props.width, height: props.height }} {...props.ChartDivProps}>
        <ResponsiveCalendar
          data={props.summary as CalendarDatum[]}
          from={props.from}
          to={props.to}
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          margin={{ left: 20, right: 20, top: -40 }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
        />
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  buttons: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

ModuleAnnualSummary.defaultProps = {
  width: "100%",
  height: 200,
};

export default ModuleAnnualSummary;

