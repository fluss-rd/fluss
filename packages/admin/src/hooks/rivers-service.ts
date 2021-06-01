import { getToken } from "helpers/token";
import River from "models/River";
import ServiceResponse from "models/ServiceResponse";
import { useQuery, UseQueryOptions } from "react-query";
import * as service from "services/rivers/rivers-service";

export function useGetRivers(
  options?: UseQueryOptions<ServiceResponse<River[]>, unknown, ServiceResponse<River[]>, string>
) {
  return useQuery(
    "rivers",
    () => {
      const token = getToken();
      return service.getRivers(token);
    },
    options
  );
}
