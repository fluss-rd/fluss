import { useState } from "react";

type Prev<T> = (prev: T) => Partial<T>;
export default function useMergeState<T>(initialState: T): UseMergeState<T> {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState: T | Prev<T>) => {
    if (typeof newState === "function")
      setState((prevState: T) => Object.assign({}, prevState, (newState as Prev<T>)(prevState)));
    else setState((prevState) => Object.assign({}, prevState, newState));
  };

  return [state, setMergedState];
}

export type UseMergeState<T> = [T, (newState: Partial<T> | Prev<T>) => void];
