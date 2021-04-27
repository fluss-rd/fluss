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
import { useRouter } from "next/router";

import FlussDrawreItem from "./FlussDrawerItem";

export default function FlussDrawerItems() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.menuButtons}>
      <List component="nav">
        <FlussDrawreItem title="Inicio" icon={Home} to="/" />
        <FlussDrawreItem title="Módulos" icon={ViewModule} to="/modules" as="/modulos" />
        <FlussDrawreItem
          title="Cuerpos hídricos"
          icon={TrackChanges}
          to="/rivers"
          as="cuerpos-hidricos"
        />
        <FlussDrawreItem
          title="Roles y permisos"
          icon={VpnKey}
          to="/roles-and-permissions"
          as="roles-y-permisos"
        />
        <FlussDrawreItem title="Usuarios" icon={People} to="/users" as="usuarios" />
        <Divider />
        <FlussDrawreItem
          title="Notificaciones"
          icon={Notifications}
          to="/notifications"
          as="notificaciones"
        />
        <FlussDrawreItem title="Ajustes" icon={Settings} to={router.pathname} as="/ajustes" />
      </List>
    </div>
  );
}

const useStyles = makeStyles({
  menuButtons: {
    flexGrow: 1,
  },
});
