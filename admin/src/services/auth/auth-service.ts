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

export async function getUserData(userId?: string): Promise<AxiosResponse<UserData | null>> {
  if (!userId) return mockAxiosResponse(null);

  const data: UserData = {
    id: "U-1",
    name: "Nombre",
    surname: "Apellido",
    email: "fluss.rd.admin@gmai.com",
    lastUpdate: "18/04/2021 22:00",
    creationDate: "04/01/2021 22:00",
    phoneNumber: "(829) 242-1342",
  };

  const response = mockAxiosResponse<UserData>(data);
  return response;
}


