import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { ResponsiveCalendar, CalendarDatum } from "@nivo/calendar";

interface ModuleAnnualSummaryProps {
  summary: Array<CalendarDatum>;
  from: string; // Start date.
  to: string; // Finish date.
}

const ModuleAnnualSummary: FC<ModuleAnnualSummaryProps> = (props) => {
  const classes = useStyles();

  return (
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
  );
};

const useStyles = makeStyles({});

export default ModuleAnnualSummary;

