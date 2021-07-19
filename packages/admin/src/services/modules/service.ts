import { ModuleForm } from "./models";
import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";
import { Module } from "shared/services/modules/models";
import { moduleFormToModuleRegistration } from "./models";

export async function registerModule(
  moduleForm: ModuleForm,
  token: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.post<ModuleForm, AxiosResponse<Module>>(
    `/modules`,
    moduleFormToModuleRegistration(moduleForm),
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  console.log({ response})

  return response;
}

