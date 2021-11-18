import { Card, Grid } from "@material-ui/core";
import React, { FC } from "react";
import { Control, UseFormMethods, useWatch } from "react-hook-form";
import FormField from "shared/components/FormField";
import Map, { defaultFocus } from "shared/components/Map";
import Location from "shared/models/Location";
import { useGetWatershedById } from "shared/services/watersheds/hooks";

interface LocationFormProps {
  form: UseFormMethods<{ location: Location; riverID: string }>;
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
        <Card variant="outlined" style={{ width: "100%", height: 450 }}>
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
  const watershedId = useWatch({
    control,
    name: "watershedId",
    defaultValue: "",
  });
  const location = useWatch({
    control,
    name: "location",
    defaultValue,
  });

  const watershedQuery = useGetWatershedById(watershedId);
  const watershedLocation = watershedQuery?.data?.area || [];
  const latitude = parseFloat(location?.latitude.toString()) || 0.0;
  const longitude = parseFloat(location?.longitude.toString()) || 0.0;
  const locations = latitude === 0 && longitude === 0 ? [] : [{ latitude, longitude }];
  const { focus, zoom } = computeFocus(locations, watershedLocation);

  return (
    <Map
      zoom={zoom}
      locations={locations}
      focusLocation={focus}
      areas={watershedLocation && [watershedLocation]}
      enableAreaDrawing
      onClick={onNewMarker}
    />
  );
};

const computeFocus = (locations: Location[], watershedLocation: Location[]) => {
  if (locations.length > 0) return { focus: locations[0], zoom: 13 };
  else if (watershedLocation.length > 0) return { focus: watershedLocation, zoom: 10 };

  return { focus: defaultFocus, zoom: 7 };
};

export default LocationForm;
