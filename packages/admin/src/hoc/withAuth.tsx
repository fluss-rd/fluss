import { CircularProgress } from "@material-ui/core";
import LoadingLayout from "layouts/LoadingLayout";
import LoginLayout from "layouts/LoginLayout";
import Login from "pages/login";
import { ComponentType, FC } from "react";
import { useGetUserData } from "services/auth/hooks";
import { useRouter } from "next/router";
import ForgotPassword from "../pages/forgot-password";

export default function withAuth(Component: ComponentType) {
  const Auth: FC = (props) => {
    const router = useRouter();
    const query = useGetUserData();
    const loggedIn = query.isSuccess ? (query.data?.data ? true : false) : false;

    if (query.isLoading)
      return (
        <LoadingLayout>
          <CircularProgress />
        </LoadingLayout>
      );

    if (!loggedIn)
      return (
        <LoginLayout>
          {router.pathname === "/forgot-password" ? <ForgotPassword /> : <Login />}
        </LoginLayout>
      );

    return <Component {...props} />;
  };

  if ((Component as any).getInitialProps)
    (Auth as any).getInitialProps = (Component as any).getInitialProps;

  return Auth;
}

