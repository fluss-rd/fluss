import withAuth from "hoc/withAuth";
import React, { FC } from "react";

import MainLayout from "./MainLayout";

const Layout: FC = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default withAuth(Layout);
