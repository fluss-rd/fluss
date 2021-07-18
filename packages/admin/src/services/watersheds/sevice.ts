import { WatershedForm } from "./models";
import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";

export async function registerWatershed(watershedForm: WatershedForm): Promise<AxiosResponse> {
  const response = await axiosInstance.post<WatershedForm, AxiosResponse>(`/rivers`, watershedForm);

  return response;
}

