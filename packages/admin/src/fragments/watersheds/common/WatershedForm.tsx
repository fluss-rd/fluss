import { yupResolver } from "@hookform/resolvers";
import { InfoOutlined, LocationOn } from "@material-ui/icons";
import { Card } from "@material-ui/core";
import LocationForm from "components/LocationForm";
import { Location } from "components/Map";
import React, { FC } from "react";
import { useForm, UseFormMethods } from "react-hook-form";
import { WatershedForm as WatershedFormModel } from "services/watersheds/models";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import * as yup from "yup";
import Map from "shared/components/Map";
import { Feature, Geometry } from "geojson";

export interface WatershedFormProps {
  form: UseFormMethods<WatershedFormModel>;
}

const WatershedForm: FC<WatershedFormProps> = ({ form }) => {
  const onSelectedArea = (area: Array<[number, number]>) => {
    const points = area.map((point) => ({ longitude: point[0], latitude: point[1] }));
    console.log({ points });
  };

  const onDeleteSelectedArea = () => {
    console.log("Deleted");
  };

  return (
    <>
      <FormIconTitle Icon={InfoOutlined} title="Datos" />
      <FormField
        name="name"
        label="Nombre"
        error={!!form.errors.name}
        helperText={form.errors.name?.message}
        inputRef={form.register}
      />
      <FormIconTitle Icon={LocationOn} title="Ubicación" />
      <Card style={{ width: "100%", height: 400 }} elevation={0} variant="outlined">
        <Map enableDraw onSelectArea={onSelectedArea} onDeleteArea={onDeleteSelectedArea} />
      </Card>
    </>
  );
};

export function useWatershedForm(
  defaultValues: WatershedFormModel = { name: "", location: { latitude: 0, longitude: 0 } }
) {
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

