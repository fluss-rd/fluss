import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";

interface Hello2Props {}

const Hello2: FC<Hello2Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.red}>Hola</div>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    estilo: { color: red },
  })
);

export default Hello2;
