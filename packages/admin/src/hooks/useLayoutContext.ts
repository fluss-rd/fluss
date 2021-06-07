import { LayoutContext } from "layouts/Layout";
import { useContext } from "react";

export default function useLayoutContext() {
  const context = useContext(LayoutContext);
  return context;
}
