import { makeStyles, Theme } from "@material-ui/core/styles";
import MonitorPanel from "./MonitorPanel";
import React, { FC, useState } from "react";
import Map, { defaultZoom } from "../../components/Map";
import { appBarHeight } from "shared/helpers";
import Module, { mockModules } from "../../models/Module";
import ModuleMarker from "./ModuleMarker";
import lagunaOviedo from "./laguna_oviedo";
import yaqueDelNorte from "./yaque_del_norte";

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
    <div className={classes.map}>
      <Map
        zoom={props.mode === "admin" ? defaultZoom - 0.22 : undefined}
        locations={locations}
        areas={[lagunaOviedo.points, yaqueDelNorte.points]}
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
  );
};

const useStyles = makeStyles<Theme, { mode: MonitorMode }>((theme) => ({
  map: {
    height: `100vh`,
    position: ({ mode }) => (mode === "user" ? "absolute" : "relative"),
    width: "100%",
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
}));

Monitor.defaultProps = {
  mode: "user",
};

export default Monitor;

