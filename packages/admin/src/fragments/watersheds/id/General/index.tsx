import { makeStyles } from "@material-ui/core/styles";
import Map from "components/Map";
import { mockModules } from "models/Module";
import React, { FC } from "react";
import { mockWatersheds } from "shared/models/Watershed";

import ModuleMarker from "./ModuleMarker";
import WatershedDetailCard from "./WatershedDetailCard";

interface GeneralProps {
  watershedId: string;
}

const General: FC<GeneralProps> = (props) => {
  const classes = useStyles();
  const watershed = mockWatersheds().find((w) => w.id === props.watershedId);
  const modules = mockModules().filter((m) => m.watershedId === props.watershedId);
  const locations = modules.map(({ wqi, id, alias: name, location }) => ({
    value: { wqi, id, name },
    latitude: location.latitude,
    longitude: location.longitude,
  }));

  return (
    <div className={classes.container}>
      <div className={classes.map}>
        <Map
          locations={locations}
          zoom={10}
          render={({ value }) => (
            <ModuleMarker wqi={value.wqi} name={value.name} moduleId={value.id} />
          )}
        />
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
