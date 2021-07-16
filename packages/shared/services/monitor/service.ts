import axiosInstance from "../axiosInstance";
import ModuleModel, { fromModuleResponse } from "../../models/Module";
import { WatershedsMapData, Waterbody, Module } from "./models";
import { fromWaterbodyResponse } from "../../models/Watershed";

export async function getWatershedsMapData(): Promise<WatershedsMapData> {
  const waterBodiesResponse = await axiosInstance.get<Waterbody[]>(`/rivers`);
  const modulesResponse = await axiosInstance.get<Module[]>(`/modules`);

  const data: WatershedsMapData = { modules: [], watersheds: [] };

  if (waterBodiesResponse?.data)
    waterBodiesResponse.data.forEach((w) => data.watersheds.push(fromWaterbodyResponse(w)));

  if (modulesResponse?.data)
    modulesResponse.data.forEach((m) => data.modules.push(fromModuleResponse(m)));

  return data;
}

export async function getModule(moduleId: string): Promise<ModuleModel | null> {
  const moduleResponse = await axiosInstance.get<Module>(`/modules/${moduleId}`);
  if (moduleResponse?.data) {
    return fromModuleResponse(moduleResponse.data);
  }

  return null;
}

