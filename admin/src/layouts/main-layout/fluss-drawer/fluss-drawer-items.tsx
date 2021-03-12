import { Divider, List, makeStyles } from "@material-ui/core";
import {
  Home,
  Notifications,
  People,
  Settings,
  TrackChanges,
  ViewModule,
  VpnKey,
} from "@material-ui/icons";

import DrawerItem from "./drawer-item";

export default function FlussDrawerItems() {
  const classes = useStyles();

  return (
    <div className={classes.menuButtons}>
      <List component="nav">
        <DrawerItem title="Inicio" icon={Home} />
        <DrawerItem title="Módulos" icon={ViewModule} />
        <DrawerItem title="Cuerpos hídricos" icon={TrackChanges} />
        <DrawerItem title="Roles y permisos" icon={VpnKey} />
        <DrawerItem title="Usuarios" icon={People} />
        <Divider />
        <DrawerItem title="Notificaciones" icon={Notifications} />
        <DrawerItem title="Ajustes" icon={Settings} />
      </List>
    </div>
  );
}

const useStyles = makeStyles({
  menuButtons: {
    flexGrow: 1,
  },
});
