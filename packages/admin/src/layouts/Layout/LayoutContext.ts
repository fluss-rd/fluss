import { createContext, useContext } from "react";

export const initialValues: LayoutValues = { drawerWidth: 240, pagePadding: 0 };

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
  updateValues: (newValues: Partial<LayoutValues>) => void;
};

export type LayoutValues = { drawerWidth: number; pagePadding: number };

export default LayoutContext;

