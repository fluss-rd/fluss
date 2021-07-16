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

