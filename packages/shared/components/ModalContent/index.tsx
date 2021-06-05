import { makeStyles, Theme } from "@material-ui/core/styles";
import c from "clsx";
import React, { CSSProperties, FC, ReactNode } from "react";

interface ModalContentProps {
  children?: ReactNode;
  style?: CSSProperties;
  spacing?: number;
  className?: string;
}

const ModalContent: FC<ModalContentProps> = ({ children, style, className, spacing }) => {
  const classes = useStyles({ spacing });

  return (
    <div className={c(classes.content, className)} style={style}>
      {children}
    </div>
  );
};

const useStyles = makeStyles<Theme, { spacing: number }>((theme) => ({
  content: {
    paddingLeft: theme.spacing(3.2),
    paddingRight: theme.spacing(3.2),
    paddingBottom: theme.spacing(3.2),

    "& > *:not(:last-child)": {
      marginBottom: ({ spacing }) => theme.spacing(spacing),
    },
  },
}));

ModalContent.defaultProps = { spacing: 0 };

export default ModalContent;
