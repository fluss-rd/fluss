import { createContext, FC, useContext } from "react";

import * as todos from "./placeholder-service";
import * as auth from "./auth-service";

interface ServiceProviderProps {
  todos?: {
    getToDo?: (userId: number) => Promise<todos.PlaceholderResponse>;
  };
  auth?: {
    login: (credentials: auth.Credentials) => Promise<void>;
  };
}

const ServiceProvider: FC<ServiceProviderProps> = (props) => {
  const value: ServiceProviderProps = {
    todos: {
      getToDo: todos.getTodo || props.todos.getToDo,
    },
    auth: {
      login: auth.login || props.auth.login,
    },
  };

  return <ServiceContext.Provider value={value}>{props.children}</ServiceContext.Provider>;
};

const ServiceContext = createContext<ServiceProviderProps>(null);
export const useService = () => useContext(ServiceContext);

export default ServiceProvider;

