import { yupResolver } from "@hookform/resolvers";
import { useGetRivers } from "hooks/rivers-service";
import River from "models/River";
import ServiceResponse from "models/ServiceResponse";
import { ChangeEvent, useEffect } from "react";
import { useForm, UseFormMethods } from "react-hook-form";
import { UseQueryResult } from "react-query";
import { ModuleForm } from "services/modules/models";
import * as yup from "yup";

export type UseModuleForm = {
  onRiverIdChange: (e: ChangeEvent<{ name: string; value: string }>) => void;
  changeLocation: (latitude: number, longitude: number) => void;
  form: UseFormMethods<ModuleForm>;
  riversQuery: UseQueryResult<ServiceResponse<River[]>, unknown>;
};

export default function useModuleForm(formIsOpen = true): UseModuleForm {
  const form = useForm<ModuleForm>({ resolver: yupResolver(moduleFormSchema) });
  const riversQuery = useGetRivers({ enabled: false });

  // Register riverId to the form.
  useEffect(() => {
    form.register("riverId");
  }, [form.register]);

  // Fetch rivers data on opening
  useEffect(() => {
    if (formIsOpen) {
      riversQuery.refetch();
    }
  }, [formIsOpen]);

  // Update the riverId value when the river name changes.
  const onRiverIdChange = (e: ChangeEvent<{ name: string; value: string }>) => {
    if (!riversQuery.data?.data) return;

    const riverName = e.target.value;
    const riverMatch = riversQuery.data.data.find((river) => river.name === riverName);

    form.setValue("riverId", riverMatch?.id || "", { shouldValidate: true });
  };

  const changeLocation = (latitude: number, longitude: number) => {
    form.setValue("location.latitude", latitude);
    form.setValue("location.longitude", longitude);
  };

  return {
    onRiverIdChange,
    changeLocation,
    form,
    riversQuery,
  };
}

export const moduleFormSchema: yup.SchemaOf<ModuleForm> = yup.object().shape({
  phoneNumber: yup.string().required("Por favor, introduzca el número de teléfono del módulo"),
  riverId: yup
    .string()
    .required("Por favor, seleccione el cuerpo hídrico donde el módulo se encuentra ubicado"),
  serial: yup.string().required("Por favor, introduzca el serial del módulo"),
  location: yup.object().shape({
    latitude: yup
      .number()
      .typeError("La latitud ingresada noes válida, debe ser un número")
      .required("Debe inidicar la latitud de la ubicación del módulo"),
    longitude: yup
      .number()
      .typeError("La longitud ingresada noes válida, debe ser un número")
      .required("Debe inidicar la longitud de la ubicación del módulo"),
  }),
});
