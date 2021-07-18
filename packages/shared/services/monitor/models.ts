import WatershedModel from "../../models/Watershed";
import Location from "../../models/Location";
import ModuleModel from "../../models/Module";

export type Waterbody = {
  riverID: string;
  name: string;
  location: Array<Location>;
  userID: string;
  type: string;
  creationDate: string;
  updateDate: string;
};

export type Module = {
  moduleID: string;
  phoneNumber: string;
  alias: string;
  riverID: string;
  riverName: string;
  userID: string;
  creationDate: string;
  updateDate: string;
  state: string;
  serial: string;
  location: Location;
};

export type WatershedsMapData = {
  modules: ModuleModel[];
  watersheds: WatershedModel[];
};

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
