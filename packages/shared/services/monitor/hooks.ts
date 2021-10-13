import { useQuery } from "react-query";
import * as service from "./service";

export function useWatershedsMapData() {
  const query = useQuery("watershed-map-data", service.getWatershedsMapData);
  return query;
}

export function useGetModuleReport(moduleId?: string) {
  const query = useQuery(
    ["module-report", moduleId],
    () => service.getModuleReportFilterHour(moduleId),
    {
      enabled: !!moduleId,
    }
  );
  return query;
}

export function useGetModuleAnualReport(moduleId?: string) {
  const query = useQuery(
    ["module-anual-report", moduleId],
    () => service.getModuleReportFilterDay(moduleId),
    {
      enabled: !!moduleId,
    }
  );
  return query;
}

