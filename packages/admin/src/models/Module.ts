import { ModuleForm } from "services/modules/models";
import Location from "shared/models/Location";
import Wqi from "shared/models/Wqi";

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

export function toModuleForm(module: Module): ModuleForm {
  return {
    alias: module?.alias || "",
    serial: module?.serial || "",
    phoneNumber: module?.phoneNumber || "",
    status: module?.state || "",
    watershedId: module?.watershedId || "",
    location: module?.location || { latitude: 0, longitude: 0 },
  };
}

export function mockModules(): Module[] {
  return [
    {
      id: "MD-1",
      alias: "Río Mao",
      location: { latitude: 19.412994, longitude: -71.11003 },
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
      alias: "Río Maguá",
      location: { latitude: 19.356815, longitude: -71.119494 },
      updateDate: new Date(2021, 6, 11),
      creationDate: new Date(2021, 6, 11),
      serial: "ABCD230493",
      watershedId: "WS-1",
      phoneNumber: "8493421921",
      state: "active",
      wqi: { value: 23, rating: "good" },
      batteryLevel: 30,
    },
  ];
}
export default Module;
