import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import WqiCategoryItem from "./WqiCategoryItem";

interface Leyend2Props {}

const Leyend2: FC<Leyend2Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <WqiCategoryItem category="excellent" />
      <WqiCategoryItem category="good" />
      <WqiCategoryItem category="moderate" />
      <WqiCategoryItem category="bad" />
      <WqiCategoryItem category="veryBad" />
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

