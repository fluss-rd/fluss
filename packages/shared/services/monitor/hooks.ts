import { useQuery } from "react-query";
import * as service from "./service";

export function useWatershedsMapData() {
  const query = useQuery("watershed-map-data", service.getWatershedsMapData);
  return query;
}


