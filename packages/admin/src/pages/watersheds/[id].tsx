import { makeStyles } from "@material-ui/core/styles";
import React, { FC, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { AppBar, Toolbar, Typography, Divider, Tab, Tabs, Paper } from "@material-ui/core";
import { ChevronRight, PanoramaHorizontal } from "@material-ui/icons";
import { mockWatersheds } from "models/watershed";
import Center from "components/Center";
import TabPanel from "shared/components/TabPanel";

interface WatershedProps {}

const Watershed: FC<WatershedProps> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const watersheds = mockWatersheds();
  const watershed = watersheds.find((w) => w.id === router.query?.id);
  const [value, setValue] = React.useState(2);

  const changeTab = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (!watershed) return <EmptyWatershed />;

  return (
    <div>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5">Cuerpos hídricos</Typography>
          <ChevronRight color="action" className={classes.separator} />
          <Typography variant="h6" color="secondary">
            {watershed.name}
          </Typography>
        </Toolbar>
        <Divider />
      </AppBar>
      <Paper square>
        <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={changeTab}>
          <Tab label="General" />
          <Tab label="Módulos" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        hey
      </TabPanel>
      <TabPanel value={value} index={1}>
        hey2
      </TabPanel>
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

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.background.paper,
  },
  separator: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export default Watershed;

