import { AxiosResponse } from "axios";
import { getToken, getUserId, removeToken, storeToken } from "helpers/token";
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query";
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
