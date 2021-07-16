import { useQuery } from "react-query";
import { getWatershedsMapData } from "./service";
import { WatershedsMapData } from "./models";

export function useWatershedsMapData() {
  const query = useQuery("watershed-map-data", getWatershedsMapData);
  return query;
}

