import { makeStyles } from "@material-ui/core/styles";
import c from "clsx";
import React, { CSSProperties, FC, ReactNode } from "react";

interface ModalContentProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const ModalContent: FC<ModalContentProps> = ({ children, style, className }) => {
  const classes = useStyles();

  return (
    <div className={c(classes.content, className)} style={style}>
      {children}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    paddingLeft: theme.spacing(3.2),
    paddingRight: theme.spacing(3.2),
    paddingBottom: theme.spacing(3.2),
  },
}));

export default ModalContent;
