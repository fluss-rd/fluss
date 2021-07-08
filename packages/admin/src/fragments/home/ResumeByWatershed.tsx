import { Button, Card, CardContent, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ResponsiveCalendar } from "@nivo/calendar";
import { mockDateMeasures } from "models/date-measure";
import { useRouter } from "next/router";
import React, { FC, useMemo } from "react";

interface ResumeByWatershedProps {}

const ResumeByWatershed: FC<ResumeByWatershedProps> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const measures = useMemo(() => mockDateMeasures(), []);

  const goToRiver = () => {
    router.push("/watersheds/WS-1");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Resumen de cuerpos hídricos</Typography>
      </CardContent>

      <Divider />

      <CardContent>
        <Button color="primary" className={classes.watershedTitle} onClick={goToRiver}>
          Río Yaque del Norte
        </Button>

        <div className={classes.chartCalendar}>
          <ResponsiveCalendar
            data={measures[0]}
            from="2015-03-01"
            to="2016-07-12"
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
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  chartCalendar: {
    height: 300,
  },
  watershedTitle: {
    width: "100%",
  },
  card: {
    display: "flex",
    "& > div:first-child": {
      flex: 1,
      display: "flex",
      alignItems: "center",
    },
    "& > div:not(:first-child)": {
      display: "flex",
      alignItems: "center",
    },
  },
}));

export default ResumeByWatershed;
