import { WatershedForm } from "./models";
import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";

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

