import { Dialog, ListItem, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { AccountCircle, Notifications as NotificationsIcon } from "@material-ui/icons";
import { NextRouter, useRouter } from "next/router";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import TabPanel, { HorizontalIconTab } from "shared/components/TabPanel";
import { appBarHeight } from "shared/helpers";

import Notifications from "./Notifications";
import UserInfo from "./UserInfo";

const Settings: FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const settingsRoute = "/settings";
  const [isOpen, activeIndex] = computeOpening(router, settingsRoute);

  const [activeTab, setActiveTab] = useState(activeIndex);

  // Select the active tab for the opened settings dialog.
  useEffect(() => setActiveTab(activeIndex), [isOpen, activeIndex]);

  function changeActiveTab(_: ChangeEvent<{}>, newValue: number) {
    setActiveTab(newValue);
  }

  function closeDialog() {
    if (router.asPath == settingsRoute && router.pathname !== settingsRoute)
     router.push(router.pathname)
    else
      router.push("/")
  }

  return (
    <Dialog fullWidth open={isOpen} onClose={closeDialog} maxWidth="lg">
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
          <TabPanel value={activeTab} index={1} padding={0}>
            <Notifications />
          </TabPanel>
          <TabPanel value={activeTab} index={2} padding={0}>
            <UserInfo />
          </TabPanel>
        </div>
      </div>
    </Dialog>
  );
};

function computeOpening(router: NextRouter, settingsRoute: string): [boolean, number] {
  const settingsName = settingsRoute.split("/")[1];
  const parts = router.asPath.split("/");
  const isOpen = parts[1] === settingsName;
  const userInfoIsActive = parts[2] === "informacion-de-cuenta";

  let activeIndex = 1;

  if (userInfoIsActive) activeIndex = 2;

  return [isOpen, activeIndex];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: `calc(100vh - ${appBarHeight(theme) * 2}px)`,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    background: theme.palette.grey[50],
  },
  tabPanels: {
    flexGrow: 1,
  },
}));
export default Settings;
