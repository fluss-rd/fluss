import { Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";

const FlussContainer: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Container maxWidth="xl" className={classes.container}>
        {children}
      </Container>
    </main>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(3),
    },
    content: {
      flexGrow: 1,
    },
  })
);

export default FlussContainer;
