import { useEffect, useState } from "react";

export type UseMergeState<T> = [T, (newState: Partial<T>) => void];

function useMergeState<T>(initialState: T): UseMergeState<T> {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState: T) =>
    setState((prevState) => Object.assign({}, prevState, newState));

  return [state, setMergedState];
}

interface ResponseFetching<T> {
  loading: boolean;
  data: T | null;
}

export default function useFetch<T>(
  callback: () => void,
  initialState: null | T = null
): UseMergeState<ResponseFetching<T>> {
  const [response, setResponse] = useMergeState<ResponseFetching<T>>({
    loading: true,
    data: initialState,
  });

  useEffect(() => {
    callback();
  }, []);

  return [response, setResponse];
}
