import { getUserId } from "helpers/token";
import { useGetUserData } from "hooks/auth-service";
import LoginLayout from "layouts/LoginLayout";
import Login from "pages/login";
import { ComponentType, FC } from "react";

export default function withAuth(Component: ComponentType) {
  const Auth: FC = (props) => {
    const userId = getUserId();
    console.log(userId);
    const { isSuccess, data } = useGetUserData(userId);
    console.log(isSuccess, data);
    const loggedIn = isSuccess && userId ? (data.data ? true : false) : false;

    console.log(loggedIn);

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

