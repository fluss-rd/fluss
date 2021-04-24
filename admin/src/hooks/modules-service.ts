import { AxiosResponse } from "axios";
import { getToken } from "helpers/token";
import { useQuery, UseQueryOptions } from "react-query";
import { ModuleData } from "services/modules/models";
import * as service from "services/modules/modules-service";

export function useGetModules() {
  return useQuery("modules", () => {
    const token = getToken();
    return service.getModules(token);
  });
}

export function useGetModule(
  moduleId: string,
  options?: UseQueryOptions<AxiosResponse<ModuleData>, unknown, AxiosResponse<ModuleData>, string[]>
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
