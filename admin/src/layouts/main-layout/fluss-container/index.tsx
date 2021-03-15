import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useContext } from "react";

import { DrawerValues, DrawerValuesContext } from "../index";

const FlussContainer: FC = ({ children }) => {
  const context = useContext(DrawerValuesContext);
  const classes = useStyles(context);

  return (
    <main className={classes.content}>
      {!context.mdUp && <div className={classes.toolbar} />}
      <div className={classes.container}>{children}</div>
    </main>
  );
};

const useStyles = makeStyles<Theme, DrawerValues>((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
    },
    content: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
  })
);

export default FlussContainer;
