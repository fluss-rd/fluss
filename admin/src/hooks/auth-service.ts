import { getUserId, storeToken, removeToken } from "helpers/token";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as service from "services/auth/auth-service";

export function useLogin() {
  const queryClient = useQueryClient();
  const mutation = useMutation(service.logIn, {
    onSuccess: (data) => {
      if (data.data) {
        const { token, userId } = data.data;
        storeToken(token, userId);
        queryClient.refetchQueries("user");
      }
    },
  });

  return mutation;
}

export function useLogOut() {
  const queryClient = useQueryClient();

  const logOut = async () => {
    const userId = getUserId();
    removeToken();

    service.logOut(userId);
  };

  const mutation = useMutation(logOut, {
    onSuccess: () => queryClient.refetchQueries("user"),
  });

  return mutation;
}

export function useGetUserData() {
  return useQuery(["user"], () => {
    const userId = getUserId();
    return service.getUserData(userId);
  });
}
