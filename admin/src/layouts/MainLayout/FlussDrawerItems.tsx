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
        <FlussDrawreItem title="Inicio" icon={Home} />
        <FlussDrawreItem title="Módulos" icon={ViewModule} />
        <FlussDrawreItem title="Cuerpos hídricos" icon={TrackChanges} />
        <FlussDrawreItem title="Roles y permisos" icon={VpnKey} />
        <FlussDrawreItem title="Usuarios" icon={People} />
        <Divider />
        <FlussDrawreItem title="Notificaciones" icon={Notifications} />
        <FlussDrawreItem title="Ajustes" icon={Settings} />
      </List>
    </div>
  );
}

const useStyles = makeStyles({
  menuButtons: {
    flexGrow: 1,
  },
});
