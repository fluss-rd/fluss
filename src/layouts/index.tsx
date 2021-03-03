import React, { FC } from "react";

import MainLayout from "./main-layout";

const Layout: FC = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

const Hello = () => <Layout>hola</Layout>;

export default Layout;
