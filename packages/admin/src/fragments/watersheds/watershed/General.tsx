import { makeStyles } from "@material-ui/core/styles";
import Map from "components/Map";
import React, { FC } from "react";
import WatershedDetailCard from "./WatershedDetailCard";

interface GeneralProps {}

const General: FC<GeneralProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.map}>
        <Map />
      </div>
      <div className={classes.riverDetail}>
        <WatershedDetailCard />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  riverDetail: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    width: 500,
    top: theme.spacing(4),
    left: theme.spacing(4),
  },
}));

export default General;

