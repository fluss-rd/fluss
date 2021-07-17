import Location from "../../models/Location";

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

