import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { CSSProperties, FC, ReactNode } from "react";
import { DialogContent, DialogContentProps } from "@material-ui/core";

export interface ModalContentProps extends Partial<DialogContentProps> {
  children?: ReactNode;
  spacing?: number;
}

const ModalContent: FC<ModalContentProps> = (props) => {
  const { children, className, spacing, ...rest } = props;
  const classes = useStyles({ spacing });

  return (
    <DialogContent className={clsx(classes.content, className)} {...rest}>
      {children}
    </DialogContent>
  );
};

const useStyles = makeStyles<Theme, { spacing: number }>((theme) => ({
  content: {
    "& > *:not(:last-child)": {
      marginBottom: ({ spacing }) => theme.spacing(spacing),
    },
  },
}));

ModalContent.defaultProps = { spacing: 0 };

export default ModalContent;

