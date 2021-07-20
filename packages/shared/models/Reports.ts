import { Module } from "../services/modules/models";
import { ModuleReportModel } from "../services/reporting/models";

export type ReportModuleDetail = {
  module: Module;
  data: ModuleReportModel;
};