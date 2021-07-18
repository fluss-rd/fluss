import axiosInstance from "../axiosInstance";
import ModuleModel, { fromModuleResponse } from "../../models/Module";
import { ModuleReport, Module } from "./models";

export async function getModules(): Promise<ModuleModel[]> {
  const reportsModulesResponse = await axiosInstance.get<ModuleReport[]>(`/reports/modules`);
  const modulesResponse = await axiosInstance.get<Module[]>(`/modules`);

  const modules: ModuleModel[] = [];
  if (reportsModulesResponse?.data && modulesResponse?.data) {
    for (const report of reportsModulesResponse.data) {
      const match = modulesResponse.data.find((m) => m.moduleID === report.moduleID);
      if (match) {
        modules.push(fromModuleResponse(match, report));
      }
    }
  }

  return modules;
}
