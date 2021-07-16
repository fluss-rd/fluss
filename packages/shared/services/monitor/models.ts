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

export interface ModuleParameter {
  name: string;
  value: number;
  date: string;
}

export interface ModuleData {
  wqi: number;
  wqiClassification: string;
  lastDate: string;
  parameters: ModuleParameter[];
  location: Location;
}

export interface ModuleReport {
  moduleID: string;
  riverID: string;
  data: ModuleData[];
  lastUpdated: string;
}

export type WatershedsMapData = {
  modules: ModuleModel[];
  watersheds: WatershedModel[];
};

