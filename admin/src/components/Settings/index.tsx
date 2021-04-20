import { Dialog, ListItem, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { AccountCircle, Notifications as NotificationsIcon } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import TabPanel, { HorizontalIconTab } from "shared/components/TabPanel";
import { appBarHeight } from "shared/helpers";

import Notifications from "./Notifications";
import UserInfo from "./UserInfo";

const Settings: FC = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(1);
  const router = useRouter();
  const settingsRoute = "/ajustes";
  const isOpen = router.asPath === "/ajustes";

  useEffect(handleSettingsOpeningOnRefresh, []);

  function handleSettingsOpeningOnRefresh() {
    // TODO: Improve this: Go to home page if the page has ben reloaded and the route is the contextual route "/ajustes".
    const { pathname, route, asPath, push } = router;

    const fromPageReload =
      pathname === settingsRoute && route === settingsRoute && asPath === settingsRoute;
    if (fromPageReload) push("/", settingsRoute);
  }

  function changeActiveTab(_: ChangeEvent<{}>, newValue: number) {
    setActiveTab(newValue);
  }

  return (
    <Dialog fullWidth open={isOpen} onClose={() => router.push(router.pathname)} maxWidth="lg">
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={activeTab}
          onChange={changeActiveTab}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <ListItem>
            <ListItemText primary="Ajustes" />
          </ListItem>
          <HorizontalIconTab label="Notificaciones" icon={<NotificationsIcon />} index={1} />
          <HorizontalIconTab label="Mi cuenta" icon={<AccountCircle />} index={2} />
        </Tabs>
        <div className={classes.tabPanels}>
          <TabPanel value={activeTab} index={1}>
            <Notifications />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <UserInfo />
          </TabPanel>
        </div>
      </div>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: `calc(100vh - ${appBarHeight(theme) * 2}px)`,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: 0,
    margin: 0,
    background: theme.palette.grey[50],
  },
  tabPanels: {
    flexGrow: 1,
  },
}));

export default Settings;
