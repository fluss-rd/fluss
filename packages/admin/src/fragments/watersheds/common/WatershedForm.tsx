import { yupResolver } from "@hookform/resolvers";
import { LocationOn, InfoOutlined } from "@material-ui/icons";
import { Location } from "components/Map";
import React, { FC } from "react";
import { useForm, UseFormMethods } from "react-hook-form";
import { WatershedForm as WatershedFormModel } from "services/watersheds/models";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import * as yup from "yup";
import LocationForm from "components/LocationForm";

export interface WatershedFormProps {
  form: UseFormMethods<WatershedFormModel>;
}

const WatershedForm: FC<WatershedFormProps> = ({ form }) => {
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
      <LocationForm form={form as unknown as UseFormMethods<{ location: Location }>} />
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

