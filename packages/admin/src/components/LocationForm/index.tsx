import { Grid, Card } from "@material-ui/core";
import FormField from "shared/components/FormField";
import React, { FC } from "react";
import { Control, UseFormMethods, useWatch } from "react-hook-form";
import Location from "models/location";
import Map from "../Map";

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
  const mark = {
    latitude: parseFloat(location.latitude.toString()),
    longitude: parseFloat(location.longitude.toString()),
  };

  return <Map locations={[mark]} onClick={onNewMarker} />;
};

export default LocationForm;

