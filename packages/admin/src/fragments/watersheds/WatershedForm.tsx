import { Card, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LocationOn } from "@material-ui/icons";
import Map, { Location } from "components/Map";
import React, { FC, useState } from "react";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";

interface WatershedFormProps {}

const WatershedForm: FC<WatershedFormProps> = (props) => {
  const [markers, setMarkers] = useState<Location[]>([{ latitude: 19.8401, longitude: -71.687 }]);
  const onNewMarker = (location: Location) => {
    console.log(location);
    setMarkers([{ ...location }]);
  };

  return (
    <>
      <FormField name="name" label="Nombre" />

      <FormIconTitle Icon={LocationOn} title="Ubicación" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormField name="latitude" label="Longitud" />
            </Grid>
            <Grid item xs={12}>
              <FormField name="longitude" label="Latitud" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" style={{ width: "100%", height: 250 }}>
            <Map locations={markers} onClick={onNewMarker} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles({});

export default WatershedForm;
