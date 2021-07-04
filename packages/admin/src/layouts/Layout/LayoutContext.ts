import { createContext, useContext } from "react";

export const initialValues: LayoutValues = { drawerWidth: 240 };

const LayoutContext = createContext<LayoutContextValue>({
  values: initialValues,
  updateValues: () => {},
});

export function useLayoutContext() {
  const context = useContext(LayoutContext);
  return context;
}

export type LayoutContextValue = {
  values: LayoutValues;
  updateValues: (newValues: LayoutValues) => void;
};

export type LayoutValues = { drawerWidth: number };


export default LayoutContext;
