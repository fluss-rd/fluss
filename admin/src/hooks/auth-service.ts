import { useMutation, useQuery, useQueryClient } from "react-query";
import * as service from "services/auth/auth-service";

export function useLogin() {
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.refetchQueries("user");
  const mutation = useMutation(service.logIn, { onSuccess });

  return mutation;
}

export function useLogOut() {
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.refetchQueries("user");
  const mutation = useMutation(service.logOut, { onSuccess });

  return mutation;
}

export function useGetUserData(userId?: string) {
  console.log(":O");
  return useQuery(["user"], () => service.getUserData(userId));
}
