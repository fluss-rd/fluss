import { getToken, getUserId, removeToken, storeToken } from "helpers/token";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as service from "services/modules/modules-service";

export function useGetModules() {
  return useQuery("modules", () => {
    const token = getToken();
    return service.getModules(token);
  });
}
