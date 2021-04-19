import { useMutation, useQueryClient } from "react-query";
import * as service from "services/auth/auth-service";

export function useLogin() {
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries("credentials");
  const mutation = useMutation(service.logIn, { onSuccess });

  return mutation;
}

