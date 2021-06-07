import { useContext } from "react";
import { LayoutContext } from "layouts/Layout";

export default function useLayoutContext() {
  const context = useContext(LayoutContext);
  return context;
}
