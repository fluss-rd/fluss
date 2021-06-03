import { AxiosResponse } from "axios";

export default class ServiceResponse<U> {
  statusCode: number;
  statusText: string;
  data: U;

  static fromAxiosResponse<T, U>(
    axiosResponse?: AxiosResponse<T>,
    mapData?: (data?: T) => U
  ): ServiceResponse<U> {
    const response: ServiceResponse<U> = {
      statusCode: axiosResponse?.status,
      statusText: axiosResponse?.statusText,
      data: mapData ? mapData(axiosResponse?.data) : (axiosResponse.data as unknown as U),
    };

    return response;
  }
}
