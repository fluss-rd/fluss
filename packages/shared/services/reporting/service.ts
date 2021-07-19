import axiosInstance from "../axiosInstance";
import {
  ModuleReportModel} from "./models";

export async function getReportAllData(): Promise<> | null> {
  const moduleReportResponse = await axiosInstance.get<ModuleReportModel>(`/reports/rivers/${riverID}`);

  if (moduleReportResponse?.data) {
    return fromModuleReportFilterDayResponse(moduleReportResponse.data);
  }

  return null;
}

