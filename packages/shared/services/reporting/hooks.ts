import { useQuery } from "react-query";
import * as service from "./service";

export function useReportAllModulesData() {
  const query = useQuery("report-all-data", service.getReportAllModulesData);
  return query;
}