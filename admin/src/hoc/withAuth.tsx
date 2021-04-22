import { CircularProgress } from "@material-ui/core";
import { useGetUserData } from "hooks/auth-service";
import LoadingLayout from "layouts/LoadingLayout";
import LoginLayout from "layouts/LoginLayout";
import Login from "pages/login";
import { ComponentType, FC } from "react";

export default function withAuth(Component: ComponentType) {
  const Auth: FC = (props) => {
    const query = useGetUserData();
    const { isSuccess, data: response, isLoading } = query;
    const loggedIn = isSuccess ? (response?.data ? true : false) : false;

    if (isLoading)
      return (
        <LoadingLayout>
          <CircularProgress />
        </LoadingLayout>
      );

    if (!loggedIn)
      return (
        <LoginLayout>
          <Login />
        </LoginLayout>
      );

    return <Component {...props} />;
  };

  if ((Component as any).getInitialProps)
    (Auth as any).getInitialProps = (Component as any).getInitialProps;

  return Auth;
}
