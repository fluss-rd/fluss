import { yupResolver } from "@hookform/resolvers";
import { Card, MenuItem, FormHelperText } from "@material-ui/core";
import { InfoOutlined, LocationOn } from "@material-ui/icons";
import { Location } from "components/Map";
import React, { FC } from "react";
import { WatershedForm as WatershedFormModel } from "services/watersheds/models";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import Map, { defaultFocus, defaultZoom } from "shared/components/Map";
import { Controller, useForm, UseFormMethods, Control, useWatch } from "react-hook-form";
import * as yup from "yup";
import FormSelect from "shared/components/FormSelect";
import { watershedTypes, watershedTypeToString } from "shared/models/WatershedType";

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
      <Controller
        name="type"
        control={form.control}
        defaultValue={form.getValues()?.type || ""}
        as={
          <FormSelect
            noneText="Sin seleccionar"
            label="Cuerpo hídrico"
            helperText={form.errors.type?.message}
            error={!!form.errors.type}
          >
            {watershedTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {watershedTypeToString(type)}
              </MenuItem>
            ))}
          </FormSelect>
        }
      />
      <FormIconTitle Icon={LocationOn} title="Ubicación"></FormIconTitle>
      <FormHelperText error={!!form.errors.location}>
        {!!!form.errors.location ? (
          <>
            Trace el área del río a registrar. Haga click en el botón "Habilitar sección" (botón con
            ícono de marcos) para empezar el trazo.
          </>
        ) : (
          (form.errors.location as any)?.message
        )}
      </FormHelperText>
      <Card style={{ width: "100%", height: 500 }} elevation={0} variant="outlined">
        <RenderMap
          control={form.control}
          defaultValue={form.getValues().location}
          onSelectArea={onSelectedArea}
          onDeleteSelectedArea={onDeleteSelectedArea}
        />
      </Card>
    </>
  );
};

interface RenderMapProps {
  control: Control<{ location: Location[] }>;
  defaultValue?: Location[];
  onSelectArea: (area: Array<[number, number]>) => void;
  onDeleteSelectedArea: () => void;
}

const RenderMap: FC<RenderMapProps> = (props) => {
  const { control, defaultValue, onSelectArea, onDeleteSelectedArea } = props;
  const area = useWatch<Location[]>({
    control: control,
    name: "location",
    defaultValue: defaultValue?.length > 0 ? defaultValue : [],
  });

  return (
    <Map
      enableDraw
      focusLocation={area?.length ? area : defaultFocus}
      zoom={!area?.length ? 7 : 10}
      onSelectArea={onSelectArea}
      onDeleteArea={onDeleteSelectedArea}
      areas={[area]}
    />
  );
};

export function useWatershedForm(
  defaultValues: Partial<WatershedFormModel> = { name: "", type: "", location: [] },
  dependencies: any[] = []
) {
  const form = useForm<WatershedFormModel>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    form.reset({
      name: defaultValues.name,
      type: defaultValues.type,
      location: defaultValues.location,
    });
  }, dependencies);

  return form;
}

const schema: yup.SchemaOf<WatershedFormModel> = yup.object().shape({
  name: yup.string().required("Por favor, introduzca el nombre del cuerpo hídrico"),
  type: yup.string().required("Debe introducir el tipo del cuerpo hídrico trazado"),
  location: yup
    .array()
    .of(
      yup.object().shape({
        latitude: yup.number(),
        longitude: yup.number(),
      })
    )
    .required("Por favor trace la región correspondiente al cuerpo hídrico"),
});

export default WatershedForm;

