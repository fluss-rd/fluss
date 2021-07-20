import { AxiosResponse } from "axios";

import axiosInstance from "../axiosInstance";
import { WatershedForm } from "./models";

export async function registerWatershed(
  watershedForm: WatershedForm,
  token: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.post<WatershedForm, AxiosResponse>(
    `/rivers`,
    watershedForm,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response;
}
