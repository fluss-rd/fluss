import { AxiosResponse } from "axios";
import { ModuleData } from "./models";

import axiosInstance from "../axiosInstance";
import replaceProperty from "helpers/replaceProperty";

export async function getModules(token: string): Promise<AxiosResponse<ModuleData[] | null>> {
  console.log(token)
  const response = await axiosInstance.get<ModuleData[]>(`/modules`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(response)
  if (response.data) {
    for (let module of response.data) {
      replaceProperty(module, "moduleID", "moduleId");
      replaceProperty(module, "riverID", "riverId");
      replaceProperty(module, "userID", "userId");
    }
  }

  return response;
}

