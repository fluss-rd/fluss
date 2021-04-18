import axiosInstance from "./axiosInstance";
export type Credentials = {
  email: string;
  password: string;
}

export async function login(credentials: Credentials) {
  const response = await axiosInstance.post<Credentials>("/account/login", credentials);
  console.log(response);
}
