import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";

import useFetch from "../hooks/useFetch";
import { PlaceholderResponse, useService } from "../services/service";
import { connect, StoreProps } from "../store";

const DataAndReports: FC<StoreProps> = ({ store }) => {
  const classes = useStyles();
  const service = useService();
  const [response, setResponse] = useFetch<PlaceholderResponse>(loadData);

  async function loadData() {
    setResponse({ loading: true });
    try {
      const toDo: PlaceholderResponse = await service.getToDo(1);
      setResponse({ loading: false, data: toDo });
    } catch (e) {
      alert(e);
      setResponse({ loading: false });
    }
  }

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

      <br />
      <br />
      {response.loading ? <span>Loading</span> : <code>{JSON.stringify(response.data)}</code>}
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
