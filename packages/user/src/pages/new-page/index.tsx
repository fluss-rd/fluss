import { makeStyles } from "@material-ui/core/styles";
import PrintNumbers from "components/PrintNumbers";
import React, { FC } from "react";

const NewPage: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.myStyle}>
      <span>Hey</span>
      <PrintNumbers numbers={[1, 2, 3, 4]} />
    </div>
  );
};

const useStyles = makeStyles({
  myStyle: { background: "yellow" },
});

export default NewPage;
