import React, { FC } from "react";

import MainLayout from "./main-layout";

const Layout: FC = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
