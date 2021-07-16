import axiosInstance from "../axiosInstance";
import ModuleStateModel from "../../models/ModuleState";
import { WatershedsMapData, Waterbody, Module } from "./models";

export async function getWatershedsMapData(): Promise<WatershedsMapData> {
  const waterBodiesResponse = await axiosInstance.get<Waterbody[]>(`/rivers`);
  const modulesResponse = await axiosInstance.get<Module[]>(`/modules`);

  const data: WatershedsMapData = { modules: [], watersheds: [] };

  if (waterBodiesResponse.data) {
    waterBodiesResponse.data.forEach((w) => {
      data.watersheds.push({
        updateDate: new Date(w.updateDate),
        creationDate: new Date(w.creationDate),
        location: { longitude: 0, latitude: 0 },
        name: w.name,
        id: w.riverID,
        wqi: { value: 80, rating: "excellent" },
        area: w.location,
        modulesQuantity: 3,
      });
    });
  }

  if (modulesResponse.data) {
    modulesResponse.data.forEach((m) => {
      data.modules.push({
        location: m.location,
        wqi: { rating: "moderate", value: 20 },
        id: m.moduleID,
        creationDate: new Date(m.creationDate),
        updateDate: new Date(m.updateDate),
        serial: m.serial,
        state: m.state as ModuleStateModel,
        alias: m.alias,
        phoneNumber: m.phoneNumber,
        watershedId: m.riverID,
        batteryLevel: 20,
      });
    });
  }

  return data;
}

