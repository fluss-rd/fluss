import { makeStyles } from "@material-ui/core/styles";
import Map from "components/Map";
import React, { FC } from "react";

interface GeneralProps {}

const General: FC<GeneralProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Map />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
  },
}));

export default General;
