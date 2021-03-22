import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useContext } from "react";

import { MainLayoutContext, MainLayoutValues } from "./index";

const FlussContainer: FC = ({ children }) => {
  const context = useContext(MainLayoutContext);
  const classes = useStyles(context);

  return (
    <main className={classes.content}>
      {!context.mdUp && <div className={classes.toolbar} />}
      <div className={classes.container}>{children}</div>
    </main>
  );
};

const useStyles = makeStyles<Theme, MainLayoutValues>((theme: Theme) => ({
  content: {
    flexGrow: 1,
    minHeight: "100vh",
  },
  container: {
    padding: theme.spacing(3),
    height: "100%",
  },
  toolbar: theme.mixins.toolbar,
}));

export default FlussContainer;
