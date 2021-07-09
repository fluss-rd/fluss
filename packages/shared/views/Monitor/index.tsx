import { makeStyles } from "@material-ui/core/styles";
import MonitorPanel from "./MonitorPanel";
import React, { FC } from "react";
import Map from "../../components/Map";
import { appBarHeight } from "shared/helpers";
import { mockWatersheds } from "../../models/Watershed";

const Monitor: FC = () => {
  const classes = useStyles();
  const watershed = mockWatersheds().find((w) => w.id === props.watershedId);
  const modules = mockModules().filter((m) => m.watershedId === props.watershedId);
  const locations = modules.map(({ wqi, id, alias: name, location }) => ({
    value: { wqi, id, name },
    latitude: location.latitude,
    longitude: location.longitude,
  }));

  return (
    <div>
      <div className={classes.map}>
        <Map zoom={10} />
      </div>
      <div className={classes.card}>
        <MonitorPanel />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  map: {
    height: `100vh`,
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: appBarHeight(theme) + theme.spacing(3),
    right: theme.spacing(3),
  },
  leyend: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default Monitor;

