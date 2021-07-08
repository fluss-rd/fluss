import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import WqiLegendItem from "./WqiLegendItem";

interface Leyend2Props {}

const Leyend2: FC<Leyend2Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <WqiLegendItem category="excellent" />
      <WqiLegendItem category="good" />
      <WqiLegendItem category="moderate" />
      <WqiLegendItem category="bad" />
      <WqiLegendItem category="veryBad" />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default Leyend2;

