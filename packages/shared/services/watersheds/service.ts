import axiosInstance from "../axiosInstance";
import Watershed, { fromWaterbodyResponse } from "../../models/Watershed";
import { Waterbody } from "./models";

export async function getWatersheds(): Promise<Watershed[]> {
  const waterBodiesResponse = await axiosInstance.get<Waterbody[]>(`/rivers`);

  const watersheds: Watershed[] = [];
  if (waterBodiesResponse?.data)
    waterBodiesResponse.data.forEach((w) => watersheds.push(fromWaterbodyResponse(w)));

  return watersheds;
}

