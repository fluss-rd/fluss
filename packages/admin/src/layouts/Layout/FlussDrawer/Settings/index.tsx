import { Dialog, ListItem, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { Tab, Tabs } from "@material-ui/core";
import { AccountCircle, Notifications as NotificationsIcon } from "@material-ui/icons";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import TabPanel, { HorizontalIconTab } from "shared/components/TabPanel";
import { appBarHeight } from "shared/helpers";

import Notifications from "./Notifications";
import UserInfo from "./UserInfo";

interface SettingsProps {
  open?: boolean;
  close?: () => void;
  view?: "account" | "notifications";
}

const Settings: FC<SettingsProps> = ({ open, view, close }) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(view === "notifications" ? 1 : 2);

  useEffect(selectActiveTab, [open, view]);

  const closeDialog = () => {
    close();
  };

  function selectActiveTab() {
    if (open) setActiveTab(view === "notifications" ? 1 : 2);
  }

  function changeActiveTab(_: ChangeEvent<{}>, newValue: number) {
    if (newValue !== 0) setActiveTab(newValue);
  }

  return (
    <Dialog fullWidth open={open} onClose={closeDialog} maxWidth="lg">
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={activeTab}
          onChange={changeActiveTab}
          aria-label="vertical-tabs"
          className={classes.tabs}
        >
          <Tab
            value={0}
            label={
              <ListItem style={{ padding: 0, textTransform: "capitalize", fontWeight: "bold" }}>
                <ListItemText primary="Ajustes" />
              </ListItem>
            }
          />

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

Settings.defaultProps = {
  open: false,
  view: "account",
};

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
