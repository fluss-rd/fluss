import { getToken, getUserId, removeToken, storeToken } from "helpers/token";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as service from "services/modules/modules-service";

export function useGetModules() {
  return useQuery("modules", () => {
    const token = getToken();
    return service.getModules(token);
  });
}

export function useGetModule(moduleId: string) {
  return useQuery(["module", moduleId], () => {
    const token = getToken();
    return service.getModule(token, moduleId);
  });
}
