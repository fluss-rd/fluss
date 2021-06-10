import { Fab as MuiFab, FabProps as MuiFabProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { FC } from "react";

interface FabProps extends MuiFabProps {}

const Fab: FC<FabProps> = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <MuiFab {...props} className={clsx(classes.fab, props.classes)}>
      {props.children}
    </MuiFab>
  );
};

Fab.defaultProps = {
  variant: "extended",
  color: "primary",
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

export default Fab;
