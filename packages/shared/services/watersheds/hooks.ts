import { useQuery } from "react-query";
import * as service from "./service";

export function useGetWatersheds() {
  const query = useQuery("watersheds", service.getWatersheds);
  return query;
}
