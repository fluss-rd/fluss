import { createContext, FC, useContext } from "react";

import axios from "./index";

interface ServiceProviderProps {
  getToDo?: (userId: number) => Promise<PlaceholderResponse>;
}

export const ServiceProvider: FC<ServiceProviderProps> = (props) => {
  const value = {
    getToDo: props.getToDo || getTodo,
  };

  return <ServiceContext.Provider value={value}>{props.children}</ServiceContext.Provider>;
};

const ServiceContext = createContext<ServiceProviderProps>(null);
export const useService = () => useContext(ServiceContext);

export interface PlaceholderResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getTodo(userId: number): Promise<PlaceholderResponse> {
  const response = await axios.get<PlaceholderResponse>(`todos/${userId}`);
  return response.data;
}
