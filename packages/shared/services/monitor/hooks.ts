import { useQuery } from "react-query";
import * as service from "./service";

export function useWatershedsMapData() {
  const query = useQuery("watershed-map-data", service.getWatershedsMapData);
  return query;
}

export function useGetModule(moduleId?: string) {
  const query = useQuery(["module", moduleId], () => service.getModule(moduleId), {
    enabled: !!moduleId,
  });
  return query;
}

