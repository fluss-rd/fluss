import { AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import { Credentials, LogInData } from "./models";

export async function logIn(credentials: Credentials) {
  const response = await axiosInstance.post<Credentials, AxiosResponse<LogInData>>(
    "/account/login",
    credentials
  );
  return response;
}

