import DateMeasure, { fromModuleReportFilterDayResponse } from "../../models/DateMeasure";
import ModuleModel, { fromModuleResponse } from "../../models/Module";
import ParameterMeasures, {
  fromModuleReportFilterHourResponse,
} from "../../models/ParameterMeasures";
import axiosInstance from "../axiosInstance";
import { Module } from "../modules/models";
import { getModules } from "../modules/service";
import { getWatersheds } from "../watersheds/service";
import { ModuleReportModel, ParameterType, WatershedsMapData } from "./models";

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

// TODO: accept different search params
export async function getModuleReportFilterHour(
  moduleId: string
): Promise<ParameterMeasures | null> {
  const moduleReportResponse = await axiosInstance.get<ModuleReportModel>(
    `/reports/modules/${moduleId}/details?cardinality=1h`
  );

  if (moduleReportResponse?.data) {
    return fromModuleReportFilterHourResponse(moduleReportResponse.data);
  }

  return null;
}

// TODO: add start and end date (I couldn't get it to work on the api)
export async function getModuleReportFilterDay(
  moduleId: string
): Promise<Record<ParameterType, DateMeasure[]> | null> {
  const moduleReportResponse = await axiosInstance.get<ModuleReportModel>(
    `/reports/modules/${moduleId}/details?cardinality=1d`
  );

  if (moduleReportResponse?.data) {
    return fromModuleReportFilterDayResponse(moduleReportResponse.data);
  }

  return null;
}
