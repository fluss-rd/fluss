import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { AppBar, Toolbar, Typography, Divider, Tab, Tabs, Paper } from "@material-ui/core";
import { ChevronRight, PanoramaHorizontal } from "@material-ui/icons";
import { mockWatersheds } from "models/watershed";
import Center from "components/Center";
import TabPanel from "shared/components/TabPanel";
import General from "fragments/watersheds/watershed/General";
import appBarHeight from "shared/helpers/appBarHeight";
import useLayoutContext from "hooks/useLayoutContext";

interface WatershedProps {}

const Watershed: FC<WatershedProps> = () => {
  const [value, setValue] = React.useState(0);
  const context = useLayoutContext();
  const classes = useStyles({ drawerWidth: context.values.drawerWidth });
  const router = useRouter();
  const watersheds = mockWatersheds();
  const watershed = watersheds.find((w) => w.id === router.query?.id);

  const changeTab = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (!watershed) return <EmptyWatershed />;

  return (
    <div className={classes.container}>
      <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5">Cuerpos hídricos</Typography>
          <ChevronRight color="action" className={classes.separator} />
          <Typography variant="h6" color="secondary">
            {watershed.name}
          </Typography>
        </Toolbar>
        <Divider />
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={changeTab}
            style={{ height: tabsHeight }}
          >
            <Tab label="General" />
            <Tab label="Módulos" />
          </Tabs>
        </Paper>
      </AppBar>
      <Toolbar />
      <div className={classes.panels}>
        <TabPanel value={value} index={0} BoxProps={{ padding: 0, className: classes.general }}>
          <General />
        </TabPanel>
        <TabPanel value={value} index={1}>
          hey2
        </TabPanel>
      </div>
    </div>
  );
};

const EmptyWatershed = () => (
  <Center>
    <PanoramaHorizontal fontSize="large" />
    <br />
    <Typography variant="h6">No se encontró el cuerpo hídrico indicado</Typography>
  </Center>
);

const useStyles = makeStyles<Theme, { drawerWidth: number }>((theme) => ({
  container: {
    height: `calc(100% - ${appBarHeight(theme) + tabsHeight}px)`,
  },
  appBar: {
    background: theme.palette.background.paper,
    paddingLeft: ({ drawerWidth }) => drawerWidth, // Workds with padding instead of marign because is this page is inside the container's layout
  },
  separator: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  panels: {
    height: "100%",
    marginTop: tabsHeight,
  },
  general: {
    height: "100%",
  },
}));

const tabsHeight = 40;

export default Watershed;

