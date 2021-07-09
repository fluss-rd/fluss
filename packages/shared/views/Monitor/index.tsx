import { makeStyles } from "@material-ui/core/styles";
import MonitorPanel from "./MonitorPanel";
import React, { FC, useState } from "react";
import Map from "../../components/Map";
import { appBarHeight } from "shared/helpers";
import Module, { mockModules } from "../../models/Module";
import ModuleMarker from "./ModuleMarker";

const Monitor: FC = () => {
  const classes = useStyles();
  const [watershedId, setWatershedId] = useState("Todos");
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

  console.log({ modules, locations });

  return (
    <div>
      <div className={classes.map}>
        <Map
          zoom={10}
          locations={locations}
          render={({ value }) => (
            <ModuleMarker wqi={value.wqi} name={value.name} moduleId={value.id} />
          )}
        />
      </div>
      <div className={classes.card}>
        <MonitorPanel watershedId={watershedId} onWatershedChange={onWatershedChange} />
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

