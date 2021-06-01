import { makeAutoObservable } from "mobx";
import Module from "models/Module";
import { createContext } from "react";

export class State {
  counter = 0;
  modules = Module.mockData();
  loggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  increment = () => (this.counter += 1);

  logout = () => (this.loggedIn = false);

  logIn = () => (this.loggedIn = true);
}

export const initialState = new State();
export const StateContext = createContext(initialState);
export type StoreProps = { store: State };
