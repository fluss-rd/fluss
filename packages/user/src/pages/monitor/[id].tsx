import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  IconButton,
  Hidden,
  Card,
  Divider,
  CardContent,
  Grid,
} from "@material-ui/core";
import { createStyles, fade, Theme } from "@material-ui/core/styles";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import GetAppIcon from "@material-ui/icons/GetApp";
import { mockModules } from "shared/models/Module";
import ModuleLast24HoursChart from "shared/components/ModuleLast24HoursChart";
import Map from "shared/components/Map";

interface ModuleDataProps {}

const ModuleData: FC<ModuleDataProps> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const modules = mockModules();
  const moduleId = router.query?.id;
  const module = modules.find((module) => module.id === moduleId);

  console.log({ module });

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0} variant="outlined">
        <Toolbar>
          <div className={classes.title}>
            <Button startIcon={<KeyboardArrowLeftIcon />}>Volver al mapa</Button>
          </div>
          <div className={classes.search}>
            <Hidden smUp>
              <IconButton color="primary">
                <GetAppIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <Button color="primary" startIcon={<GetAppIcon />}>
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
          <Grid item xs={12} md={4}>
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
      </Container>
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

