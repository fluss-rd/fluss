import { Button } from "@material-ui/core";
import { FC } from "react";

import { StoreProps } from "../store";
import { connect } from "../store/connect";

const Otra: FC<StoreProps> = ({ store }) => {
  return (
    <>
      <h1>Hello, world! {store.counter}</h1>
      <Button onClick={() => store.increment()}>{store.counter}</Button>
    </>
  );
};

export default connect(Otra);
