import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";
import ModuleModel, { fromModuleResponse } from "../../models/Module";
import { ModuleReport, Module } from "./models";

export async function getModulesInfo(): Promise<AxiosResponse<Module[]>> {
  const modulesResponse = await axiosInstance.get<Module[]>(`/modules`);
  return modulesResponse;
}

export async function getModules(): Promise<ModuleModel[]> {
  const reportsModulesResponse = await axiosInstance.get<ModuleReport[]>(`/reports/modules`);
  const modulesResponse = await axiosInstance.get<Module[]>(`/modules`);

  const thereIsReportsAndModulesData = reportsModulesResponse?.data && modulesResponse?.data
  if (!thereIsReportsAndModulesData) return [];

  const modules: ModuleModel[] = [];
  for (const report of reportsModulesResponse.data) {
    const match = modulesResponse.data.find((m) => m.moduleID === report.moduleID);
    if (!match) continue;

    modules.push(fromModuleResponse(match, report));
  }

  return modules;
}

export async function getModuleInfoById(moduleId: string): Promise<AxiosResponse<Module>> {
  const moduleInfo = await axiosInstance.get<Module>(`/modules/${moduleId}`);
  return moduleInfo;
}

export async function getModuleDetailsById(moduleId: string): Promise<AxiosResponse<ModuleReport>> {
  const moduleDetails = await axiosInstance.get<ModuleReport>(
    `/reports/modules/${moduleId}/details`
  );

  return moduleDetails;
}

