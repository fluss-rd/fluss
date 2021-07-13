import { createContext, useContext } from "react";

export const initialValues = {
  drawerWidth: 240,
  pagePadding: 0,
  sidebarIsExpandedBySidebar: true,
  sidebarIsOpen: () => true,
  expandSidebar: () => {},
  collapseSideBar: () => {},
};

export type LayoutValues = typeof initialValues;

export type LayoutContextValue = {
  values: LayoutValues;
  updateValues: (newValues: Partial<LayoutValues>) => void;
};

const LayoutContext = createContext<LayoutContextValue>({
  values: initialValues,
  updateValues: () => {},
});

export function useLayoutContext() {
  const context = useContext(LayoutContext);
  return context;
}

export default LayoutContext;

