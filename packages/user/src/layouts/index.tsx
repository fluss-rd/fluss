import { useRouter } from "next/router";
import React, { FC } from "react";
import EmptyLayout from "./EmptyLayout";

import MainLayout from "./MainLayout";

const Layout: FC = ({ children }) => {
  const router = useRouter();
  const inModule = router.pathname === "/monitor/[id]";

  if (!inModule) return <MainLayout>{children}</MainLayout>;

  return <EmptyLayout>{children}</EmptyLayout>;
};

export default Layout;

