import { getToken, getUserId, removeToken, storeToken } from "helpers/token";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as service from "services/auth/service";

export function useLogin() {
  const queryClient = useQueryClient();
  console.log({ queryClient });
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
    const token = getToken();
    return service.getUserData(userId, token);
  });
}

