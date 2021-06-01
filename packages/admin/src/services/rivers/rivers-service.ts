import River from "models/River";
import ServiceResponse from "models/ServiceResponse";

import axiosInstance from "../axiosInstance";
import { RiverData } from "./models";

export async function getRivers(token: string): Promise<ServiceResponse<River[]>> {
  const response = await axiosInstance.get<RiverData[]>("/rivers", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return ServiceResponse.fromAxiosResponse(response, River.fromRiverDataList);
}
