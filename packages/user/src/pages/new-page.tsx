import { makeStyles } from "@material-ui/core/styles";
import PrintNumbers from "components/PrintNumbers";
import React, { FC } from "react";
import Another from "shared/components/Another";

const NewPage: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.myStyle}>
      <span>Hey</span>
      <PrintNumbers numbers={[1, 2, 3, 4]} />
      <Another onClick={() => console.log("hey")} />
    </div>
  );
};

const useStyles = makeStyles({
  myStyle: { background: "yellow" },
});

export default NewPage;

