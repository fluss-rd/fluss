import { Card, Grid } from "@material-ui/core";
import React, { FC } from "react";
import { Control, UseFormMethods, useWatch } from "react-hook-form";
import FormField from "shared/components/FormField";
import Location from "shared/models/Location";

import Map from "shared/components/Map";

interface LocationFormProps {
  form: UseFormMethods<{ location: Location }>;
}

const LocationForm: FC<LocationFormProps> = ({ form }) => {
  const onNewMarker = (location: Location) => {
    form.setValue("location.latitude", location.latitude);
    form.setValue("location.longitude", location.longitude);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormField
              name="location.latitude"
              label="Longitud"
              type="number"
              error={!!form.errors.location?.latitude}
              helperText={form.errors.location?.latitude?.message}
              inputRef={form.register}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name="location.longitude"
              type="number"
              label="Latitud"
              error={!!form.errors.location?.longitude}
              helperText={form.errors.location?.longitude?.message}
              inputRef={form.register}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined" style={{ width: "100%", height: 300 }}>
          <RenderMap
            control={form.control}
            onNewMarker={onNewMarker}
            defaultValue={form.getValues().location}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

interface RenderMapProps {
  control: Control<{ location: Location }>;
  onNewMarker: (location: Location) => void;
  defaultValue?: Location;
}

const RenderMap: FC<RenderMapProps> = ({ control, onNewMarker, defaultValue }) => {
  const location = useWatch({
    control,
    name: "location",
    defaultValue,
  });

  // Convert to integer because of changing in the data type.
  const latitude = parseFloat(location.latitude.toString());
  const longitude = parseFloat(location.longitude.toString());
  const mark = { latitude, longitude };
  const locations = latitude === 0 && longitude === 0 ? [] : [mark];

  return <Map locations={locations} onClick={onNewMarker} />;
};

export default LocationForm;

