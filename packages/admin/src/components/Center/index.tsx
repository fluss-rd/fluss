import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { FC } from "react";

interface CenterProps {
  className?: string;
}

const Center: FC<CenterProps> = ({ children, className }) => {
  const { center, container } = useStyles();

  return (
    <div className={clsx(container, className)}>
      <Grid container>
        <Grid item xs={12} className={center}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default Center;

