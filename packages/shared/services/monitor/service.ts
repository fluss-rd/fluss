import axiosInstance from "../axiosInstance";
import ModuleModel, { fromModuleResponse } from "../../models/Module";
import { WatershedsMapData } from "./models";
import { Module } from "../modules/models";
import { getWatersheds } from "../watersheds/service";
import { getModules } from "../modules/service";

export async function getWatershedsMapData(): Promise<WatershedsMapData> {
  const data: WatershedsMapData = {
    modules: await getModules(),
    watersheds: await getWatersheds(),
  };

  return data;
}

export async function getModule(moduleId: string): Promise<ModuleModel | null> {
  const moduleResponse = await axiosInstance.get<Module>(`/modules/${moduleId}`);
  if (moduleResponse?.data) {
    return fromModuleResponse(moduleResponse.data);
  }

  return null;
}

