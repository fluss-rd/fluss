import { AxiosResponse, AxiosRequestConfig } from "axios";

export default function mockAxiosResponse<T>(
  data?: T,
  status = 200,
  statusText = "Ok",
  config: AxiosRequestConfig = {},
  headers: any = {}
) {
  const response: AxiosResponse<T> = {
    data,
    status,
    statusText,
    config,
    headers,
  };

  return response;
}

