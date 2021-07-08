import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { Typography } from "@material-ui/core";

interface WqiLegendItemProps {
  category: WqiCategory;
}

const WqiLegendItem: FC<WqiLegendItemProps> = ({ category }) => {
  const classes = useStyles();
  const color = categoryToColor(category);
  const text = categoryToText(category);

  return (
    <div className={classes.container}>
      <div className={classes.avatar} style={{ background: color }} />
      <Typography className={classes.text} variant="caption">{text}</Typography>
    </div>
  );
};
function categoryToColor(category: WqiCategory) {
  switch (category) {
    case "excellent":
      return "#219653";
    case "good":
      return "#27AE60";
    case "moderate":
      return "#2D9CDB";
    case "bad":
      return "#F2994A";
    case "veryBad":
      return "#EB5757";
    default:
      return "";
  }
}
function categoryToText(category: WqiCategory) {
  switch (category) {
    case "excellent":
      return "Excelente";
    case "good":
      return "Buena";
    case "moderate":
      return "Moderada";
    case "bad":
      return "Mala";
    case "veryBad":
      return "Muy mala";
    default:
      return "";
  }
}

type WqiCategory = "excellent" | "good" | "moderate" | "bad" | "veryBad";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  avatar: {
    borderRadius: "50%",
    height: 15,
    width: 15,
  },
  text: {},
}));

export default WqiLegendItem;

