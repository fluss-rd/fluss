import { makeAutoObservable } from "mobx";
import Module from "models/Module";
import { createContext } from "react";

export class State {
  counter = 0;
  modules = Module.mockData();

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
