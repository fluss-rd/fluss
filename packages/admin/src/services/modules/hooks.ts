import { getToken } from "helpers/token";
import { useMutation, useQueryClient } from "react-query";
import * as models from "services/modules/models";
import * as service from "services/modules/service";

export function useRegisterModule() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (moduleForm: models.ModuleForm) => {
      const token = getToken();
      return service.registerModule(moduleForm, token);
    },
    {
      onSuccess: (data) => {
        console.log({ data });
        if (data.status === 201) {
          queryClient.refetchQueries("modules");
          queryClient.refetchQueries("modules-info");
        }
      },
    }
  );

  return mutation;
}
