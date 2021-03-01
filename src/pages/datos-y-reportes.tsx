import { Typography } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { StoreProps, connect } from "../store";

const DataAndReports: FC<StoreProps> = ({ store }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4">Datos y reportes</Typography>
      <br />
      <Typography variant="body1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab repellendus ex perferendis
        dicta ut! Magni, ipsum doloribus quas sunt, a consectetur unde debitis provident asperiores
        dolores sit assumenda officia explicabo.
      </Typography>
      <br />
      <code className={classes.value}>store.counter: {store.counter}</code>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    value: {
      color: theme.palette.secondary.main,
    },
  })
);

export default connect(DataAndReports);
