import { AxiosResponse } from "axios";
import mockAxiosResponse from "helpers/mockAxiosResponse";

import axiosInstance from "../axiosInstance";
import { Credentials, LogInData, UserData } from "./models";

export async function logIn(credentials: Credentials) {
  const response = await axiosInstance.post<Credentials, AxiosResponse<LogInData>>(
    "/account/login",
    credentials
  );

  if (response.data) {
    response.data["userId"] = response.data["userID"];
    delete response.data["userID"];
  }

  return response;
}

export async function logOut(userId: string) {
  return mockAxiosResponse(null, 200, "Ok");
}

export async function getUserData(
  userId: string,
  token: string
): Promise<AxiosResponse<UserData | null>> {
  if (!userId) return mockAxiosResponse(null);

  //const response = mockAxiosResponse<UserData>(data);
  const response = await axiosInstance.get<UserData>(`/account/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.data) {
    response.data["userId"] = response.data["userID"];
    delete response.data["userID"];
    if (!response.data.name)
      response.data.name = response.data.name ? response.data.name : "Administrador";
  }

  return response;
}
