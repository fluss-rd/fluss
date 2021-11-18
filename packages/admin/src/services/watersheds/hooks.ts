import { getToken } from "helpers/token";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as models from "services/watersheds/models";
import * as service from "services/watersheds/sevice";

export function useRegisterWatershed() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (watershedForm: models.WatershedForm) => {
      const token = getToken();
      return service.registerWatershed(watershedForm, token);
    },
    {
      onSuccess: (data) => {
        if (data.status === 201) {
          queryClient.refetchQueries("watersheds");
        }
      },
    }
  );

  return mutation;
}
