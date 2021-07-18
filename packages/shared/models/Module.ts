import { Module as ModuleResponse, ModuleReport } from "../services/modules/models";
import Location from "./Location";
import Wqi from "./Wqi";
import WqiRating from "./WqiRating";
import { toPaperClasification } from "./WqiRating";

import ModuleState from "./ModuleState";

type Module = {
  id: string;
  alias: string;
  watershedId: string;
  watershedName: string;
  state: ModuleState;
  phoneNumber: string;
  serial: string;
  creationDate: Date;
  updateDate: Date;
  location: Location;
  wqi: Wqi; // Water Quality Index.
  batteryLevel: number;
};

export function fromModuleResponse(
  moduleResponse?: ModuleResponse,
  moduleReport?: ModuleReport
): Module {
  const reportData = moduleReport?.data[0];
  const newModule = {
    location: moduleResponse?.location,
    wqi: {
      rating: toPaperClasification(reportData?.wqiClassification) || "moderate",
      value: Math.round(reportData?.wqi) / 100 || 0,
    },
    id: moduleResponse?.moduleID,
    creationDate: new Date(moduleResponse?.creationDate),
    updateDate: new Date(moduleResponse?.updateDate),
    serial: moduleResponse?.serial,
    state: moduleResponse?.state as ModuleState,
    alias: moduleResponse?.alias,
    phoneNumber: moduleResponse?.phoneNumber,
    watershedId: moduleResponse?.riverID,
    batteryLevel: 20,
    watershedName: moduleResponse?.riverName,
  };
  return newModule;
}

export function fromModuleReport(moduleReport: ModuleReport): Module {
  try {
    const data = moduleReport.data[0];
    return {
      location: data.location,
      wqi: { rating: toPaperClasification(data.wqiClassification), value: 20 },
      id: moduleReport.moduleID,
      creationDate: new Date(moduleReport.lastUpdated),
      updateDate: new Date(moduleReport.lastUpdated),
      serial: "",
      state: "deactivated",
      alias: "",
      phoneNumber: "",
      watershedId: moduleReport.riverID,
      batteryLevel: 0,
      watershedName: "",
    };
  } catch (e) {
    return {
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
      watershedName: "",
    };
  }
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
      watershedName: "Laguna Oviedo",
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
      watershedName: "Río Yaque del Norte",
    },
  ];
}

export default Module;

