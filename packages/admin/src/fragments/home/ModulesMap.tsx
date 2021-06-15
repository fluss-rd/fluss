import { Card, Typography, CardContent, Divider } from "@material-ui/core";
import Map from "components/Map";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { mockModules } from "models/module";
import ModuleMarker from "../watersheds/id/General/ModuleMarker";

interface ModulesMapProps {}

const ModulesMap: FC<ModulesMapProps> = (props) => {
  const classes = useStyles();
  const modules = mockModules().filter((m) => m.watershedId === "WS-1");
  const locations = modules.map((m) => ({
    value: { name: m.alias, wqi: m.wqi, id: m.id },
    ...m.location,
  }));

  return (
    <Card className={classes.map}>
      <CardContent>
        <Typography variant="h5">Mapa de módulos</Typography>
      </CardContent>
      <Divider />
      <div style={{ width: "100%", height: "100%" }}>
        <Map
          locations={locations}
          zoom={10}
          render={({ value }) => (
            <ModuleMarker wqi={value.wqi} name={value.name} moduleId={value.id} />
          )}
        />
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  map: {
    height: `calc(100vh - ${theme.spacing(6)}px)`,
  },
}));

export default ModulesMap;

