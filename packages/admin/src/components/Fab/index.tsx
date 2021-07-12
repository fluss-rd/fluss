import { Fab as MuiFab, FabProps as MuiFabProps } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { FC } from "react";

interface FabProps extends MuiFabProps {
  position?: string;
}

const Fab: FC<FabProps> = ({ className, position, ...props }) => {
  const classes = useStyles({ position });

  return (
    <MuiFab {...props} className={clsx(classes.fab, props.classes)}>
      {props.children}
    </MuiFab>
  );
};

Fab.defaultProps = {
  variant: "extended",
  color: "primary",
  position: "fixed",
};

const useStyles = makeStyles<Theme, { position: string }>((theme) => ({
  fab: {
    position: ({ position }) => position as any,
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

export default Fab;

