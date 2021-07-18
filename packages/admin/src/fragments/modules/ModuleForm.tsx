import { yupResolver } from "@hookform/resolvers";
import { Grid, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FiberManualRecord, Grain, InfoOutlined, LocationOn } from "@material-ui/icons";
import clsx from "clsx";
import LocationForm from "components/LocationForm";
import { Location } from "components/Map";
import React, { FC } from "react";
import { Controller, useForm, UseFormMethods } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { ModuleForm as ModuleFormModel } from "services/modules/models";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import FormSelect from "shared/components/FormSelect";
import ModuleState, { moduleStates, moduleStateToString } from "shared/models/ModuleState";
import { useGetWatersheds } from "shared/services/watersheds/hooks";
import * as yup from "yup";

interface ModuleFormProps {
  form: UseFormMethods<ModuleFormModel>;
  largeWidth?: boolean;
  className?: string;
}

const ModuleForm: FC<ModuleFormProps> = ({ form, largeWidth, className }) => {
  const classes = useStyles();
  const watershedsQuery = useGetWatersheds();
  const watersheds = watershedsQuery?.data || [];
  const md = largeWidth ? 6 : 12;
  console.log({ form: form.getValues() });

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={md} className={clsx(classes.form, className)}>
          <FormIconTitle Icon={InfoOutlined} title="Datos" />
          <FormField
            name="alias"
            label="Alias"
            placeholder="Ej: Guayubín"
            error={!!form.errors.alias}
            helperText={form.errors.alias?.message}
            inputRef={form.register}
          />

          <Controller
            name="phoneNumber"
            control={form.control}
            as={
              <ReactInputMask mask="(999) 999-9999" maskChar=" ">
                {() => (
                  <FormField
                    label="Numéro celular"
                    placeholder="Número celular"
                    error={!!form.errors.phoneNumber}
                    helperText={form.errors.phoneNumber?.message}
                  />
                )}
              </ReactInputMask>
            }
          />

          <FormField
            name="serial"
            label="Serial"
            placeholder=""
            error={!!form.errors.serial}
            helperText={form.errors.serial?.message}
            inputRef={form.register}
          />

          <FormIconTitle Icon={Grain} title="Elegir cuerpo hídrico" />

          <Controller
            name="watershedId"
            control={form.control}
            defaultValue={form.getValues()?.watershedId || " "}
            as={
              <FormSelect
                noneValue=" "
                noneText="Sin seleccionar"
                label="Cuerpo hídrico"
                helperText={form.errors.watershedId?.message}
                error={!!form.errors.watershedId}
              >
                {watersheds.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </FormSelect>
            }
          />

          <FormIconTitle Icon={FiberManualRecord} title="Elegir estado" />
          <Controller
            name="status"
            control={form.control}
            defaultValue={"active" as ModuleState}
            as={
              <FormSelect
                noneText="Sin seleccionar"
                label="Estado"
                helperText={form.errors.status?.message}
                error={!!form.errors.status}
              >
                {moduleStates.map((state) => {
                  const statusText = moduleStateToString(state);
                  return (
                    <MenuItem key={state} value={state}>
                      {statusText}
                    </MenuItem>
                  );
                })}
              </FormSelect>
            }
          />
        </Grid>
        <Grid item xs={12} md={md}>
          <FormIconTitle Icon={LocationOn} title="Ubicación" />
          <LocationForm
            form={form as unknown as UseFormMethods<{ location: Location; riverID: string }>}
          />
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export function useModuleForm(
  values: Partial<ModuleFormModel> = {
    alias: "",
    serial: "",
    phoneNumber: "",
    status: "",
    watershedId: "",
    location: { latitude: 0, longitude: 0 },
  },
  dependencies: any[] = []
) {
  const form = useForm<ModuleFormModel>({
    resolver: yupResolver(schema),
    defaultValues: { ...values },
  });

  React.useEffect(() => {
    form.reset({
      alias: values.alias,
      serial: values.serial,
      phoneNumber: values.phoneNumber,
      status: values.status,
      watershedId: values.watershedId,
      location: values.location,
    });
  }, dependencies);

  React.useEffect(() => {
    form.register("location.longitude");
    form.register("location.latitude");
  }, [form.register]);

  return form;
}

const schema: yup.SchemaOf<ModuleFormModel> = yup.object().shape({
  alias: yup.string().required("Por favor, introduzca el alias del módulo"),
  serial: yup.string().required("Por favor, introduzca el serial del módulo"),
  phoneNumber: yup.string().required("Por favor, introduzca el número telefónico del módulo"),
  status: yup.string().required("Por favor, seleccione el estado del módulo"),
  watershedId: yup.string().required("Por favor seleccione el cuerpo hídrico asociado al módulo"),
  location: yup.object().shape({
    longitude: yup.number().required("Por favor, introduzca la longitud del módulo"),
    latitude: yup.number().required("Por favor, introduzca la latitud del módulo"),
  }),
});

export default ModuleForm;

