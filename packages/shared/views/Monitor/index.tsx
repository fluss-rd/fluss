import { makeStyles, Theme } from "@material-ui/core/styles";
import MonitorPanel from "./MonitorPanel";
import React, { FC, useState } from "react";
import Map from "../../components/Map";
import { appBarHeight } from "shared/helpers";
import Module, { mockModules } from "../../models/Module";
import ModuleMarker from "./ModuleMarker";

type MonitorMode = "user" | "admin";

interface MonitorProps {
  onViewData?: (moduleId: string) => void;
  mode: MonitorMode;
}

const Monitor: FC<MonitorProps> = (props) => {
  const [watershedId, setWatershedId] = useState("Todos");
  const classes = useStyles({ mode: props.mode });
  const modules = mockModules().filter(filterModules);
  const locations = modules.map(mapToLocations);

  const onWatershedChange = (id: string) => {
    setWatershedId(id);
  };

  function filterModules(module: Module) {
    const selection = watershedId === "Todos" ? module.watershedId : watershedId;
    return module.watershedId === selection;
  }

  function mapToLocations({ wqi, id, alias: name, location }: Module) {
    return {
      value: { wqi, id, name },
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  return (
    <div>
      <div className={classes.map}>
        <Map
          locations={locations}
          onClick={(l) => console.log(l)}
          render={({ value }) => (
            <ModuleMarker
              wqi={value.wqi}
              name={value.name}
              moduleId={value.id}
              onModuleData={props.onViewData}
            />
          )}
        />
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
    top: 0,
    left: 0,
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: ({ mode }) =>
      mode === "user" ? appBarHeight(theme) + theme.spacing(3) : theme.spacing(3),
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

Monitor.defaultProps = {
  mode: "user",
};

export default Monitor;

