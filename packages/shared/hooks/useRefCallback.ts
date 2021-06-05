import { MutableRefObject, useCallback, useRef } from "react";

export default function useRefCallback<T>(
  callback: (node: T) => void,
  dependencies: any[]
): [MutableRefObject<T>, (node: any) => void] {
  const ref = useRef<T>(null);

  const setRef = useCallback((node) => {
    if (node !== null) {
      ref.current = node;
      callback(node);
    }
  }, dependencies);

  return [ref, setRef];
}
