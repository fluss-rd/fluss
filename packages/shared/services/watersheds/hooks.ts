import { useQuery } from "react-query";
import * as service from "./service";

export function useGetWatersheds() {
  const query = useQuery("watersheds", service.getWatersheds);
  return query;
}

export function useGetWqiRatingsCount(watershedId?: string) {
  const query = useQuery(
    ["reports-modules", watershedId],
    () => service.getWqiRatingsCount(watershedId),
    { enabled: !!watershedId }
  );
  return query;
}

