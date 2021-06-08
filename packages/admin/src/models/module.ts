import ModuleState from "./module-state";
import Location from "./location";

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
};

export function mockModules(): Module[] {
  return [
    {
      id: "MD-1",
      alias: "Río Mao",
      location: { latitude: 19.412994, longitude: -71.11003 },
      updateDate: new Date(Date.now()),
      creationDate: new Date(Date.now()),
      serial: "ABCD230492",
      watershedId: "WS-1",
      phoneNumber: "8093453921",
      state: "active",
    },
    {
      id: "MD-2",
      alias: "Río Maguá",
      location: { latitude: 19.356815, longitude: -71.119494 },
      updateDate: new Date(Date.now()),
      creationDate: new Date(Date.now()),
      serial: "ABCD230493",
      watershedId: "WS-1",
      phoneNumber: "8493421921",
      state: "active",
    },
  ];
}
export default Module;

