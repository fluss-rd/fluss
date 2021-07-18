import { Module as ModuleResponse, ModuleReportModel, ModuleReportData} from "../services/monitor/models";
import Location from "./Location";
import Wqi from "./Wqi";

import ModuleState from "./ModuleState";

type Module = {
  id: string;
  alias: string;
  watershedId: string;
  state: ModuleState;
  phoneNumber: string;
  serial: string;
  creationDate: Date;
  updateDate: Date;
  location: Location;
  wqi: Wqi; // Water Quality Index.
  batteryLevel: number;
};

const getWqiByModuleID = (moduleReportResponse: ModuleReportModel[]) => {
  const wqiByModuleID: Record<string, Wqi> = {}
  moduleReportResponse.forEach((moduleReport: ModuleReportModel) => {
    if (!moduleReport.data || moduleReport.data.length === 0) {
      return
    }

    wqiByModuleID[moduleReport.moduleID] = {
      value: moduleReport.data[0].wqi,
      rating: moduleReport.data[0].wqiClassification
    }
  })

  return wqiByModuleID
}

export function fromModuleResponse(moduleResponse: ModuleResponse, moduleReportResponse: ModuleReportModel[]): Module {
  const wqiByModuleID: Record<string, Wqi> = getWqiByModuleID(moduleReportResponse)

  return {
    location: moduleResponse.location,
    wqi: wqiByModuleID[moduleResponse.moduleID],
    id: moduleResponse.moduleID,
    creationDate: new Date(moduleResponse.creationDate),
    updateDate: new Date(moduleResponse.updateDate),
    serial: moduleResponse.serial,
    state: moduleResponse.state as ModuleState,
    alias: moduleResponse.alias,
    phoneNumber: moduleResponse.phoneNumber,
    watershedId: moduleResponse.riverID,
    batteryLevel: 20, // TODO: replace with the last battery level reported
  };
}

export function mockModules(): Module[] {
  return [
    {
      id: "MD-1",
      alias: "Estación sureste",
      location: {
        latitude: 17.738521,
        longitude: -71.364997,
      },
      updateDate: new Date(2021, 6, 11),
      creationDate: new Date(2021, 6, 11),
      serial: "ABCD230492",
      watershedId: "WS-1",
      phoneNumber: "8093453921",
      state: "active",
      wqi: { value: 80, rating: "good" },
      batteryLevel: 80,
    },
    {
      id: "MD-2",
      alias: "Hispaniola",
      location: {
        latitude: 19.827039,
        longitude: -71.679716,
      },
      updateDate: new Date(2021, 6, 11),
      creationDate: new Date(2021, 6, 11),
      serial: "ABCD230493",
      watershedId: "WS-2",
      phoneNumber: "8493421921",
      state: "active",
      wqi: { rating: "moderate", value: 23 },
      batteryLevel: 30,
    },
  ];
}

export default Module;

