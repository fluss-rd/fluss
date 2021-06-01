import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, ReactNode } from "react";

interface LoadingLayoutProps {
  children: ReactNode;
}

const LoadingLayout: FC<LoadingLayoutProps> = ({ children }) => {
  const { root } = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={root}>{children}</div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default LoadingLayout;
