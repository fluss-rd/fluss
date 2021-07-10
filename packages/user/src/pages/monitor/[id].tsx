import {
  AppBar,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles, fade, Theme } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { useRouter } from "next/router";
import React, { FC } from "react";
import Map from "shared/components/Map";
import ModuleAnnualSummary from "shared/components/ModuleAnnualSummary";
import ModuleDataDownload from "shared/components/ModuleDataDownload";
import ModuleLast24HoursChart from "shared/components/ModuleLast24HoursChart";
import useBoolean from "shared/hooks/useBoolean";
import { mockDateMeasures } from "shared/models/DateMeasure";
import { mockModules } from "shared/models/Module";

interface ModuleDataProps {}

const ModuleData: FC<ModuleDataProps> = (props) => {
  const [isOpen, open, close] = useBoolean();
  const classes = useStyles();
  const router = useRouter();
  const modules = mockModules();
  const moduleId = router.query?.id;
  const module = modules.find((module) => module.id === moduleId);
  const summary = mockDateMeasures()[0];

  const toMonitor = () => {
    router.push("/monitor");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0} variant="outlined">
        <Toolbar>
          <div className={classes.title}>
            <Button startIcon={<KeyboardArrowLeftIcon />} onClick={toMonitor}>
              Volver al mapa
            </Button>
          </div>
          <div className={classes.search}>
            <Hidden smUp>
              <IconButton color="primary" onClick={open}>
                <GetAppIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <Button color="primary" startIcon={<GetAppIcon />} onClick={open}>
                <span className={classes.downloadText}>Descargar datos</span>
              </Button>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <br />
      <Container maxWidth="lg">
        <Typography variant="h4">{module?.alias}</Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      Últimas 48 horas
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardContent>
                    <ModuleLast24HoursChart barHeight={40} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={5}>
                <Card variant="outlined" style={{ height: "100%", minHeight: 300 }}>
                  <CardContent>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      Ubicación
                    </Typography>
                  </CardContent>
                  <Divider />
                  <Map
                    focusLocation={module?.location}
                    zoom={10}
                    locations={[module?.location || { latitude: 0, longitude: 0 }]}
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                  Resumen anual
                </Typography>
              </CardContent>
              <Divider />
              <CardContent style={{ height: 600, width: "fit-parent" }}>
                <ModuleAnnualSummary summary={summary} from="2015-03-01" to="2016-07-12" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <ModuleDataDownload close={close} isOpen={isOpen} moduleId="hey" />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "block",
  },
  search: {},
  downloadText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default ModuleData;
