import axiosInstance from "../axiosInstance";
import ModuleModel, { fromModuleResponse, addWqiDataToModuleResponse } from "../../models/Module";
import {
  WatershedsMapData,
  Waterbody,
  Module,
  ModuleReportModel,
  ParameterType } from "./models";
import { fromWaterbodyResponse } from "../../models/Watershed";
import ParameterMeasures, { fromModuleReportFilterHourResponse } from "../../models/ParameterMeasures";
import DateMeasure, { fromModuleReportFilterDayResponse } from "../../models/DateMeasure";

export async function getWatershedsMapData(): Promise<WatershedsMapData> {
  const waterBodiesResponse = await axiosInstance.get<Waterbody[]>(`/rivers`);
  const modulesResponse = await axiosInstance.get<Module[]>(`/modules`);
  // TODO: replace the "1y" cardinality value when we have an alternative from the api, as using "1y" is a hack to get only the last message from each module.
  const moduleReportResponse = await axiosInstance.get<ModuleReportModel>(`/reports/modules?cardinality=1y&aggregationWindow=last`);

  const data: WatershedsMapData = { modules: [], watersheds: [] };

  if (waterBodiesResponse?.data)
    waterBodiesResponse.data.forEach((w) => data.watersheds.push(fromWaterbodyResponse(w)));

  if (modulesResponse?.data && moduleReportResponse?.data)
    // TODO: modify the API to return the modules with their last WQI value
    data.modules = fromModuleResponse(modulesResponse.data, moduleReportResponse.data)

  return data;
}

export async function getModule(moduleId: string): Promise<ModuleModel | null> {
  const moduleResponse = await axiosInstance.get<Module>(`/modules/${moduleId}`);
  if (moduleResponse?.data) {
    return fromModuleResponse(moduleResponse.data);
  }

  return null;
}

// TODO: accept different search params
export async function getModuleReportFilterHour(moduleId: string): Promise<ParameterMeasures | null> {
  const moduleReportResponse = await axiosInstance.get<ModuleReportModel>(`/reports/modules/${moduleId}/details?cardinality=1h`);

  if (moduleReportResponse?.data) {
    return fromModuleReportFilterHourResponse(moduleReportResponse.data);
  }

  return null;
}

// TODO: add start and end date (I couldn't get it to work on the api)
export async function getModuleReportFilterDay(moduleId: string): Promise<Record<ParameterType, DateMeasure[]> | null> {
  const moduleReportResponse = await axiosInstance.get<ModuleReportModel>(`/reports/modules/${moduleId}/details?cardinality=1d`);

  if (moduleReportResponse?.data) {
    return fromModuleReportFilterDayResponse(moduleReportResponse.data);
  }

  return null;
}

