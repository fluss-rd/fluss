import { useQuery } from "react-query";
import * as service from "./service";

export function useGetModules() {
  const query = useQuery("modules", service.getModules);
  return query;
}
