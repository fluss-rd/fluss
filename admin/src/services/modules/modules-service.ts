import { AxiosResponse } from "axios";
import replaceProperty from "helpers/replaceProperty";

import axiosInstance from "../axiosInstance";
import { ModuleData } from "./models";

export async function getModules(token: string): Promise<AxiosResponse<ModuleData[] | null>> {
  const response = await axiosInstance.get<ModuleData[]>(`/modules`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.data) {
    for (const module of response.data) {
      replaceProperty(module, "moduleID", "moduleId");
      replaceProperty(module, "riverID", "riverId");
      replaceProperty(module, "userID", "userId");
    }
  }

  return response;
}

export async function getModule(
  token: string,
  moduleId: string
): Promise<AxiosResponse<ModuleData | null>> {
  const response = await axiosInstance.get<ModuleData>(`/modules/${moduleId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.data) {
    const module = response.data;
    replaceProperty(module, "moduleID", "moduleId");
    replaceProperty(module, "riverID", "riverId");
    replaceProperty(module, "userID", "userId");

    console.log({ module });
  }

  return response;
}
