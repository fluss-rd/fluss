import { useMutation, useQuery, useQueryClient } from "react-query";
import * as service from "services/watersheds/sevice";

export function useLogin() {
  const queryClient = useQueryClient();
  const mutation = useMutation(service.registerWatershed, {
    onSuccess: (data) => {
      console.log({ data });
      if (data.status === 200) {
        queryClient.refetchQueries("watersheds");
      }
    },
  });

  return mutation;
}

