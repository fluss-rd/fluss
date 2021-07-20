import { AxiosResponse } from "axios";
import { Module } from "shared/services/modules/models";

import axiosInstance from "../axiosInstance";
import { ModuleForm } from "./models";
import { moduleFormToModuleRegistration } from "./models";

export async function registerModule(
  moduleForm: ModuleForm,
  token: string
): Promise<AxiosResponse> {
  const newModule = moduleFormToModuleRegistration(moduleForm);
  console.log({ newModule });
  const response = await axiosInstance.post<ModuleForm, AxiosResponse<Module>>(
    `/modules`,
    newModule,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  console.log({ response });

  return response;
}
