import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class State {
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment = () => {
    this.counter += 1;
  };
}

export const initialState = new State();
export const StateContext = createContext(initialState);
export type StoreProps = { store: State };
