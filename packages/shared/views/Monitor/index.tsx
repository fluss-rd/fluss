import { makeStyles, Theme } from "@material-ui/core/styles";
import MonitorPanel from "./MonitorPanel";
import React, { FC, useState } from "react";
import Map, { defaultZoom } from "../../components/Map";
import { appBarHeight } from "shared/helpers";
import Module from "../../models/Module";
import Watershed from "../../models/Watershed";
import ModuleMarker from "./ModuleMarker";
import { useWatershedsMapData } from "../../services/monitor/hooks";

type MonitorMode = "user" | "admin";

interface MonitorProps {
  onViewData?: (moduleId: string) => void;
  mode: MonitorMode;
}

const Monitor: FC<MonitorProps> = (props) => {
  const [watershedId, setWatershedId] = useState("Todos");
  const { data } = useWatershedsMapData();
  const modules = (data?.modules || []).filter(filterModules);
  const watersheds = (data?.watersheds || []).filter(filterWatersheds);
  const selectedWatershed = watersheds?.find((watershed) => watershed.id === watershedId);

  const locations = modules.map(mapToLocations);
  const areas = watersheds.map((watershed) => watershed.area);
  const classes = useStyles({ mode: props.mode });

  const onWatershedChange = (id: string) => {
    setWatershedId(id);
  };

  function filterModules(module: Module) {
    const selection = watershedId === "Todos" ? module.watershedId : watershedId;
    return module.watershedId === selection;
  }

  function filterWatersheds(watershed: Watershed) {
    const selected = watershedId === "Todos" ? watershed.id : watershedId;
    return watershed.id === selected;
  }

  function mapToLocations({ wqi, id, alias: name, location }: Module) {
    return {
      value: { wqi, id, name },
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  function computeZoom() {
    if (selectedWatershed) {
      return 12;
    }
    return props.mode === "admin" ? defaultZoom - 0.22 : undefined;
  }

  return (
    <div className={classes.map}>
      <Map
        zoom={computeZoom()}
        locations={locations}
        areas={areas}
        focusLocation={selectedWatershed?.area}
        render={({ value }) => (
          <ModuleMarker
            wqi={value.wqi}
            name={value.name}
            moduleId={value.id}
            onModuleData={props.onViewData}
          />
        )}
      />
      <div className={classes.container}>
        <div className={classes.card}>
          <MonitorPanel watershedId={watershedId} onWatershedChange={onWatershedChange} />
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles<Theme, { mode: MonitorMode }>((theme) => ({
  map: {
    height: `100vh`,
    position: ({ mode }) => (mode === "user" ? "absolute" : "relative"),
    width: "100%",
  },
  container: {
    position: "absolute",
    width: "100%",
    height: 300,
    display: "flex",
    flexDirection: "column",
    top: ({ mode }) =>
      mode === "user" ? appBarHeight(theme) + theme.spacing(3) : theme.spacing(3),
    alignItems: "flex-end",

    [theme.breakpoints.down("sm")]: {
      marginTop: -theme.spacing(4),
      alignItems: "center",
    },
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      width: "100%",
    },
  },
}));

Monitor.defaultProps = {
  mode: "user",
};

export default Monitor;

