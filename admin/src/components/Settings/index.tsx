import { Dialog, DialogTitle } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";

interface SettingsProps {}

const Settings: FC<SettingsProps> = (props) => {
  const router = useRouter();
  const settingsRoute = "/ajustes";
  const isOpen = router.asPath === "/ajustes";

  // TODO: Improve this: Go to home page if the page has ben reloaded and the route is the contextual route "/ajustes".
  useEffect(() => {
    const { pathname, route, asPath, push } = router;

    const fromPageReload =
      pathname === settingsRoute && route === settingsRoute && asPath === settingsRoute;
    if (fromPageReload) push("/", settingsRoute);
  }, []);

  return (
    <Dialog fullWidth open={isOpen} onClose={() => router.push(router.pathname)} maxWidth="lg">
      <DialogTitle>Hey</DialogTitle>
    </Dialog>
  );
};

export default Settings;
