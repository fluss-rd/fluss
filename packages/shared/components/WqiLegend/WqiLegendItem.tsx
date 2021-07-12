import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import WqiRating, { ratingToText, ratingToColor } from "../../models/WqiRating";

interface WqiLegendItemProps {
  category: WqiRating;
}

const WqiLegendItem: FC<WqiLegendItemProps> = ({ category }) => {
  const classes = useStyles();
  const color = ratingToColor(category);
  const text = ratingToText(category);

  return (
    <div className={classes.container}>
      <div className={classes.avatar} style={{ background: color }} />
      <Typography className={classes.text} variant="caption">
        {text}
      </Typography>
    </div>
  );
};

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

