export type WQIClassification = "excellent" | "good water" | "poor water" | "very poor water" | "unsuitable";

export type ParameterType = "do" | "ph" | "tds" | "tmp" | "ty" | "wqi";

export type Parameter = {
  name: ParameterType;
  value: number;
  date: string;
};

export type ModuleReportData = {
  wqi: number;
  wqiClassification: WQIClassification,
  lastDate: string;
  parameters: Parameter[]
};

export type ModuleReportModel = {
  moduleID: string;
  riverID: string;
  data: ModuleReportData[];
};
