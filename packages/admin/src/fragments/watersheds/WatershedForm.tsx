import { Card, Grid } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import Map, { Location } from "components/Map";
import React, { useState, ForwardedRef, forwardRef, useImperativeHandle, useEffect } from "react";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import { WatershedForm as WatershedFormModel } from "services/watersheds/models";
import { useForm, UseFormMethods } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

export interface WatershedFormProps {
  watershed?: WatershedFormModel;
}

export interface WatershedFormRef {
  form: UseFormMethods<WatershedFormModel>;
}

const WatershedForm = forwardRef(
  (props: WatershedFormProps, ref: ForwardedRef<WatershedFormRef>) => {
    const form = useWatershedForm(props.watershed);

    const onNewMarker = (location: Location) => {
      console.log(location);
    };

    // Share form with consumer component.
    useImperativeHandle(ref, () => ({ form }), []);

    console.log({ form });

    return (
      <>
        <FormField
          name="name"
          label="Nombre"
          error={!!form.errors.name}
          helperText={form.errors.name?.message}
          inputRef={form.register}
        />

        <FormIconTitle Icon={LocationOn} title="Ubicación" />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormField
                  name="location.latitude"
                  label="Longitud"
                  error={!!form.errors.location?.latitude}
                  helperText={form.errors.location?.latitude?.message}
                  inputRef={form.register}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  name="location.longitude"
                  label="Latitud"
                  error={!!form.errors.location?.longitude}
                  helperText={form.errors.location?.longitude?.message}
                  inputRef={form.register}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" style={{ width: "100%", height: 250 }}>
              <Map onClick={onNewMarker} />
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
);

WatershedForm.defaultProps = {
  watershed: { location: { latitude: 0, longitude: 0 }, name: "" },
};

export function useWatershedForm(defaultValues: WatershedFormModel) {
  const form = useForm<WatershedFormModel>({
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues },
  });

  return form;
}

const schema: yup.SchemaOf<WatershedFormModel> = yup.object().shape({
  name: yup.string().required("Por favor, introduzca el nombre del cuerpo hídrico"),
  location: yup.object().shape({
    longitude: yup.number().required("Por favor, introduzca la longitud para el río"),
    latitude: yup.number().required("Por favor, introduzca latitud del cuerpo hídrico"),
  }),
});

export default WatershedForm;

