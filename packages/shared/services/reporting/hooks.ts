import { useQuery } from "react-query";
import * as service from "./service";

export function useReportAllData() {
  const query = useQuery("report-all-data", service.getReportAllData);
  return query;
}