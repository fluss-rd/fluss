import { makeStyles } from "@material-ui/core/styles";
import Map from "components/Map";
import React, { FC } from "react";
import WatershedDetailCard from "./WatershedDetailCard";
import { mockWatersheds } from "models/watershed";
import { mockModules } from "models/module";

interface GeneralProps {
  watershedId: string;
}

const General: FC<GeneralProps> = (props) => {
  const classes = useStyles();
  const watershed = mockWatersheds().find((w) => w.id === props.watershedId);
  const modules = mockModules().filter((module) => module.watershedId === props.watershedId);
  const locations = modules.map((module) => module.location);

  return (
    <div className={classes.container}>
      <div className={classes.map}>
        <Map locations={locations} zoom={10} />
      </div>
      <div className={classes.riverDetail}>
        <WatershedDetailCard watershed={watershed} />
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

