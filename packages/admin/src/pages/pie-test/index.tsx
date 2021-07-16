import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import PieChart, { PieChartData } from "shared/components/PieChart";

interface PieTestProps {}

const PieTest: FC<PieTestProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <PieChart
        margin={20}
        height={300}
        data={[
          { id: "Mikhael", label: "Name", value: 20 },
          { id: "Abraham", label: "Name2", value: 10 },
        ]}
      />
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default PieTest;
