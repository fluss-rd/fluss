import { Button, List, ListSubheader, makeStyles, Theme, Typography } from "@material-ui/core";
import { ExitToApp, Home, People, TrackChanges, ViewModule, VpnKey } from "@material-ui/icons";

import DrawerItem from "./drawer-item";
import FlussLogo from "./fluss-logo";

export default function FlussDrawerItems() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FlussLogo />
      <div className={classes.menuButtons}>
        <List component="nav">
          <DrawerItem title="Inicio" icon={Home} />
          <DrawerItem title="Módulos" icon={ViewModule} />
          <DrawerItem title="Cuerpos hídricos" icon={TrackChanges} />
          <DrawerItem title="Roles y permisos" icon={VpnKey} />
          <DrawerItem title="Usuarios" icon={People} />
        </List>
      </div>

      <List component="nav">
        <DrawerItem title="Cerrar sesión" icon={ExitToApp} />
      </List>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  menuButtons: {
    flexGrow: 1,
  },
});
