import { useMutation, useQueryClient } from "react-query";
import { useService } from "services";

export default function useLogin() {
  const queryClient = useQueryClient();
  const services = useService();
  const login = services.auth.login;
  const onSuccess = () => queryClient.invalidateQueries("credentials");

  const mutation = useMutation(login, { onSuccess });

  return mutation;
}

