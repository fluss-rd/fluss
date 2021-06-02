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

import DrawerItem from "./FlussDrawerItem";

export default function DrawerItems() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.menuButtons}>
      <List component="nav">
        <DrawerItem title="Inicio" icon={Home} to="/" />
        <DrawerItem title="Módulos" icon={ViewModule} to="/modules" as="/modulos" />
        <DrawerItem
          title="Cuerpos hídricos"
          icon={TrackChanges}
          to="/rivers"
          as="cuerpos-hidricos"
        />
        <DrawerItem
          title="Roles y permisos"
          icon={VpnKey}
          to="/roles-and-permissions"
          as="roles-y-permisos"
        />
        <DrawerItem title="Usuarios" icon={People} to="/users" as="usuarios" />
        <Divider />
        <DrawerItem
          title="Notificaciones"
          icon={Notifications}
          to="/notifications"
          as="notificaciones"
        />
        <DrawerItem title="Ajustes" icon={Settings} to={router.pathname} as="/ajustes" />
      </List>
    </div>
  );
}

const useStyles = makeStyles({
  menuButtons: {
    flexGrow: 1,
  },
});
