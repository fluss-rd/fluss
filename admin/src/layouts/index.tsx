import React, { FC } from "react";

import MainLayout from "./MainLayout";

const Layout: FC = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
