import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";

const NewPage: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.myStyle}>
      <span>Hey</span>
    </div>
  );
};

const useStyles = makeStyles({
  myStyle: { background: "yellow" },
});

export default NewPage;
