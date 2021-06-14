import { MenuItem } from "@material-ui/core";
import { InfoOutlined, Grain, FiberManualRecord } from "@material-ui/icons";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import ReactInputMask from "react-input-mask";
import FormSelect from "shared/components/FormSelect";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { mockWatersheds } from "models/watershed";
import ModuleState, { moduleStates, moduleStateToString } from "models/module-state";
import { ModuleForm as ModuleFormModel } from "services/modules/models";
import { Control, useForm, UseFormMethods, useWatch, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";

interface ModuleFormProps {
  form: UseFormMethods<ModuleFormModel>;
}

const ModuleForm: FC<ModuleFormProps> = ({ form }) => {
  const classes = useStyles();
  const watersheds = mockWatersheds();

  return (
    <>
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
        defaultValue={form.getValues()?.watershedId || ""}
        as={
          <FormSelect
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
      {/*TODO: Establecer conexión con el módulo para obtener ubicación y confirmar número de teléfono*/}
    </>
  );
};

const useStyles = makeStyles({});

export function useModuleForm(
  defaultValues: Partial<ModuleFormModel> = {
    alias: "",
    serial: "",
    phoneNumber: "",
    status: "",
    watershedId: "",
  }
) {
  const form = useForm<ModuleFormModel>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return form;
}

const schema: yup.SchemaOf<ModuleFormModel> = yup.object().shape({
  alias: yup.string().required("Por favor, introduzca el alias del módulo"),
  serial: yup.string().required("Por favor, introduzca el serial del módulo"),
  phoneNumber: yup.string().required("Por favor, introduzca el número telefónico del módulo"),
  status: yup.string().required("Por favor, seleccione el estado del módulo"),
  watershedId: yup.string().required("Por favor seleccione el cuerpo hídrico asociado al módulo"),
});

export default ModuleForm;

