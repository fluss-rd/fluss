import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";

import WqiLegendItem from "./WqiLegendItem";

interface Leyend2Props {
  vertical?: boolean;
}

const Leyend2: FC<Leyend2Props> = (props) => {
  const classes = useStyles({ vertical: props.vertical });

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

const useStyles = makeStyles<Theme, { vertical: boolean }>((theme) => ({
  content: {
    overflow: "auto",
    display: "flex",
    bacground: 'red',
    flexDirection: ({ vertical }) => (vertical ? "column" : "row"),
    width: "fit-content",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default Leyend2;

