import { AxiosResponse } from "axios";
import { getToken } from "helpers/token";
import Module from "models/Module";
import { useQuery, UseQueryOptions } from "react-query";
import * as service from "services/modules/modules-service";

export function useGetModules() {
  return useQuery("modules", () => {
    const token = getToken();
    return service.getModules(token);
  });
}

export function useGetModule(
  moduleId: string,
  options?: UseQueryOptions<AxiosResponse<Module>, unknown, AxiosResponse<Module>, string[]>
) {
  return useQuery(
    ["module", moduleId],
    () => {
      const token = getToken();
      return service.getModule(token, moduleId);
    },
    options as any
  );
}
