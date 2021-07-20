import axiosInstance from "../axiosInstance";
import {
  ModuleReportModel} from "./models";
import { Module } from "../modules/models";
import { ReportModuleDetail } from "../../models/Reports";

export async function getReportAllModulesData(): Promise<ReportModuleDetail[] | null> {
  const reportModulesDetailsResponse: ReportModuleDetail[] = [];
  const modulesResponse = await axiosInstance.get<Module[]>(`/modules`);

  if (!modulesResponse?.data) {
    return
  }

  await modulesResponse.data.forEach(async module => {
    const moduleID = module.moduleID
    const reportModuleDetailResponse = await axiosInstance.get<ModuleReportModel>(`/reports/modules/${moduleID}/details`);

    if (!reportModuleDetailResponse?.data) {
      return
    }

    reportModulesDetailsResponse.push({ module, data: reportModuleDetailResponse.data })
  });


  return reportModulesDetailsResponse;
}

