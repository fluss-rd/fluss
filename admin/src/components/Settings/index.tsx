import { Dialog, ListItem, ListItemText, makeStyles, MenuItem, Theme } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { AccountCircle, Notifications } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import TabPanel, { HorizontalIconTab } from "shared/components/TabPanel";

interface SettingsProps {}

const Settings: FC<SettingsProps> = (props) => {
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

  function changeActiveTab(event: ChangeEvent<{}>, newValue: number) {
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
          <HorizontalIconTab label="Notificaciones" icon={<Notifications />} index={1} />
          <HorizontalIconTab label="Mi cuenta" icon={<AccountCircle />} index={2} />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          Item Two
        </TabPanel>
      </div>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    minHeight: 400,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: 0,
    margin: 0,
  },
}));

export default Settings;
