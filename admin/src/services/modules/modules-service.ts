import { AxiosResponse } from "axios";
import mockAxiosResponse from "helpers/mockAxiosResponse";
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
  //const response = await axiosInstance.get<ModuleData>(`/modules/${moduleId}`, {
  //headers: { Authorization: `Bearer ${token}` },
  //});

  //if (response.data) {
  //const module = response.data;
  //replaceProperty(module, "moduleID", "moduleId");
  //replaceProperty(module, "riverID", "riverId");
  //replaceProperty(module, "userID", "userId");

  //console.log({ module });
  //}

  const response = mockAxiosResponse({
    userId: "fdsa",
    riverId: "fdsf233",
    moduleId: "module-ID203",
    state: "active",
    serial: "serial-29329d",
    location: { latitude: 12.43, longitude: -39.34 },
    riverName: "Yaque del norte",
    updateDate: new Date(Date.now()).toString(),
    phoneNumber: "8098013284",
    creationDate: new Date(Date.now()).toString(),
  } as ModuleData);
  return response;
}
