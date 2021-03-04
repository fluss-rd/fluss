import { Button, Typography } from "@material-ui/core";
import { FC } from "react";

import { connect, StoreProps } from "../store";

const Home: FC<StoreProps> = ({ store }) => {
  return (
    <>
      <Typography variant="h4">Hello, world : D!</Typography>
      <br />
      <Button variant="outlined" color="secondary" onClick={() => store.counter++}>
        {store.counter}
      </Button>
    </>
  );
};

export default connect(Home);
