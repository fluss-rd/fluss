import { useState } from "react";

export default function useMergeState<T>(initialState: T): UseMergeState<T> {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState: T) =>
    setState((prevState) => Object.assign({}, prevState, newState));

  return [state, setMergedState];
}

export type UseMergeState<T> = [T, (newState: Partial<T>) => void];
