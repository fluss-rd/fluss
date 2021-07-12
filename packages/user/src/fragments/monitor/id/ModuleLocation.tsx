import { Card, CardContent, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import Map from "shared/components/Map";
import Location from "shared/models/Location";

interface ModuleLocationProps {
  location: Location;
}

const ModuleLocation: FC<ModuleLocationProps> = ({ location }) => {
  const classes = useStyles();

  return (
    <Card variant="outlined" style={{ height: "100%", minHeight: 300 }}>
      <CardContent>
        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
          Ubicación
        </Typography>
      </CardContent>
      <Divider />
      <Map
        focusLocation={location}
        zoom={10}
        locations={[location || { latitude: 0, longitude: 0 }]}
      />
    </Card>
  );
};

const useStyles = makeStyles({});

export default ModuleLocation;
