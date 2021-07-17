import WatershedModel from "../../models/Watershed";
import ModuleModel from "../../models/Module";

export type WatershedsMapData = {
  modules: ModuleModel[];
  watersheds: WatershedModel[];
};
