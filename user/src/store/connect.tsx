import { observer } from "mobx-react";
import React from "react";

import { State, StateContext } from "./state";

export const useStore = () => React.useContext(StateContext);

export const withStore = (Component: React.FC<any>) => (props: any) => {
  const store = useStore();
  return <Component {...props} store={store} />;
};

export const connect = (Component: React.FC<any>) => withStore(observer(Component));

export const connectPartially = (Component: React.FC<any>, keys: Array<keyof State>) => {
  return observer((props: any) => {
    const stateFragment: any = {};
    const store = useStore();

    for (const property of keys) stateFragment[property] = store[property];

    return <Component {...props} {...stateFragment} />;
  });
};

export function mapStore<T>(Component: React.FC<any>, storeMapping: (state: State) => T) {
  return observer((props: any) => {
    const store = useStore();
    const mapping = storeMapping(store);
    return <Component {...props} {...mapping} />;
  });
}
