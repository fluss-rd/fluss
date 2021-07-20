import { useQuery } from "react-query";
import * as service from "./service";

export function useGetModulesInfo() {
  const query = useQuery("modules-info", service.getModulesInfo);
  return query;
}

export function useGetModules() {
  const query = useQuery("modules", service.getModules);
  return query;
}

export function useGetModuleInfoById(moduleId?: string) {
  const query = useQuery(["modules-info", moduleId], () => service.getModuleInfoById(moduleId), {
    enabled: !!moduleId,
  });
  return query;
}

export function useGetModuleDetailsById(moduleId?: string) {
  const query = useQuery(["modules-details", moduleId], () => service.getModuleDetailsById(moduleId), {
    enabled: !!moduleId,
  });
  return query;
}
