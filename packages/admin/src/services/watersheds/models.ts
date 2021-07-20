import Location from "shared/models/Location";
import Watershed from "shared/models/Watershed";

export type WatershedForm = {
  name: string;
  type: string;
  location: Location[];
};

export function watershedToWatershedForm(watershed?: Watershed): WatershedForm {
  return {
    name: watershed?.name || "",
    type: watershed?.type || "",
    location: watershed?.area || [],
  };
}
