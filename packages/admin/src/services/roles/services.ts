import { AxiosResponse } from "axios";

import axiosInstance from "../axiosInstance";
import * as models from "./models";

export async function getRoles(token: string): Promise<AxiosResponse<models.Role[]>> {
  const rolesResponse = await axiosInstance.get<models.Role[]>(`/account/roles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return rolesResponse;
}
