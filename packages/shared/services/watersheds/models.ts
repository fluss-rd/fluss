import Location from "../../models/Location";

export type Waterbody = {
  riverID: string;
  name: string;
  location: Array<Location>;
  userID: string;
  type: string;
  creationDate: string;
  updateDate: string;
};

export interface Parameter {
  name: string;
  value: number;
  date: string;
}

export interface WaterbodyReportData {
  wqi: number;
  wqiClassification: string;
  lastDate: string;
  parameters: Parameter[];
  location: Location;
}

export interface WaterbodyReport {
  moduleID: string;
  riverID: string;
  data: WaterbodyReportData[];
  lastUpdated: string;
}

