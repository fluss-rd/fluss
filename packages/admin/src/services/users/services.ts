import * as models from "./models";
import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";

export async function getUsers(): Promise<AxiosResponse<models.User[]>> {
  const modulesResponse = await axiosInstance.get<models.User[]>(`/account/users`);
  return modulesResponse;
}

export async function getUserById(userId: string): Promise<AxiosResponse<models.User>> {
  const modulesResponse = await axiosInstance.get<models.User>(`/account/users/${userId}`);
  return modulesResponse;
}

export async function registerUser(
  userForm: models.UserForm,
  token: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.post<models.UserForm, AxiosResponse<models.User>>(
    `/account/users`,
    userForm,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  console.log({ response });

  return response;
}

