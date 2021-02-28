import { FC } from "react";
import { connect, StoreProps } from "../store";

const Home: FC<StoreProps> = ({ store }) => {
  return (
    <>
      <h1>Hello, world : D!</h1>
      <button onClick={() => store.counter++}>{store.counter}</button>
    </>
  );
};

export default connect(Home);
