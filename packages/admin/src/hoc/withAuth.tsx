import Login from "pages/login";
import { ComponentType, FC } from "react";
import { connect, StoreProps } from "store";

export default function withAuth(Component: ComponentType) {
  const Auth: FC<StoreProps> = ({ store, ...props }) => {
    const loggedIn = store.loggedIn;

    if (!loggedIn) return <Login />;

    return <Component {...props} />;
  };

  if ((Component as any).getInitialProps)
    (Auth as any).getInitialProps = (Component as any).getInitialProps;

  return connect(Auth);
}
