import { CssBaseline } from "@material-ui/core";
import React, { FC } from "react";

const LoginLayout: FC = ({ children }) => {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
};

export default LoginLayout;

