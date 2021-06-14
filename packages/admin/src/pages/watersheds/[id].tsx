import { AppBar, Button, Divider, Paper, Tab, Tabs, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ChevronRight, PanoramaHorizontal } from "@material-ui/icons";
import Center from "components/Center";
import General from "fragments/watersheds/id/General";
import Modules from "fragments/watersheds/id/Modules";
import useLayoutContext from "hooks/useLayoutContext";
import { mockWatersheds } from "models/watershed";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC } from "react";
import TabPanel from "shared/components/TabPanel";
import appBarHeight from "shared/helpers/appBarHeight";

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

  const navigateToWatersheds = () => {
    router.push("/watersheds");
  };

  if (!watershed) return <EmptyWatershed />;

  return (
    <div className={classes.container}>
      <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Button onClick={navigateToWatersheds} style={{ textTransform: "initial" }}>
            <Typography variant="h5">Cuerpos hídricos</Typography>
          </Button>
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
          <General watershedId={watershed.id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Modules watershedId={watershed.id} />
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
