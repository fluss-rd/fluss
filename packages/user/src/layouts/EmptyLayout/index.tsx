import { CssBaseline } from "@material-ui/core";
import React, { FC } from "react";

const EmptyLayout: FC = ({ children }) => {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
};

export default EmptyLayout;

