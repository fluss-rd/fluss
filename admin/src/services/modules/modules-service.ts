import { AxiosResponse } from "axios";
import mockAxiosResponse from "helpers/mockAxiosResponse";
import replaceProperty from "helpers/replaceProperty";
import Module from "models/Module";
import ServiceResponse from "models/ServiceResponse";

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
): Promise<ServiceResponse<Module | null>> {
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

  const module: Module = {
    id: "MDLd931a61d5bb442c696e1c9a7dfa9ed87",
    state: "inactive",
    serial: "serial-193KJF23",
    location: {
      latitude: 19.627234,
      longitude: -71.126908,
    },
    riverName: "Yaque del Norte",
    riverId: "RVRc7c5d271cc1d40e990c103950bb75514",
    createdAt: new Date(Date.now()),
    simNumber: "8098045201",
    updatedAt: new Date(Date.now()),
  };

  const response: ServiceResponse<Module> = ServiceResponse.fromAxiosResponse(
    mockAxiosResponse(module)
  );

  return response;
}
