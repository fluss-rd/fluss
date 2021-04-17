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

import FlussDrawreItem from "./FlussDrawerItem";

export default function FlussDrawerItems() {
  const classes = useStyles();

  return (
    <div className={classes.menuButtons}>
      <List component="nav">
        <FlussDrawreItem title="Inicio" icon={Home} to="/" />
        <FlussDrawreItem title="Módulos" icon={ViewModule} to="/modulos" />
        <FlussDrawreItem title="Cuerpos hídricos" icon={TrackChanges} to="/cuerpos-hidricos" />
        <FlussDrawreItem title="Roles y permisos" icon={VpnKey} to="/roles-y-permisos" />
        <FlussDrawreItem title="Usuarios" icon={People} to="/usuarios" />
        <Divider />
        <FlussDrawreItem title="Notificaciones" icon={Notifications} to="/notificaciones" />
        <FlussDrawreItem title="Ajustes" icon={Settings} to="/ajustes" />
      </List>
    </div>
  );
}

const useStyles = makeStyles({
  menuButtons: {
    flexGrow: 1,
  },
});
