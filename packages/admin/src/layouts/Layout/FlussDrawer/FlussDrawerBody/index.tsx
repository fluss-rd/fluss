import { Divider, List } from "@material-ui/core";
import {
  GpsFixed,
  Grain,
  Lock,
  Notifications,
  People,
  Settings,
  ViewModule,
} from "@material-ui/icons";
import React, { FC } from "react";

import DrawerItem from "./DrawerItem";

interface FlussDrawerBodyProps {
  openSettings: () => void;
}

const FlussDrawerBody: FC<FlussDrawerBodyProps> = ({ openSettings }) => {
  return (
    <div>
      <List>
        <DrawerItem title="Monitor" icon={GpsFixed} to="/" />
        <DrawerItem title="Cuerpos hídricos" icon={Grain} to="/watersheds" />
        <DrawerItem title="Módulos" icon={ViewModule} to="/modules" />
        <DrawerItem title="Usuarios" icon={People} to="/users" />
        <DrawerItem title="Roles y permisos" icon={Lock} to="/roles-and-permissions" />
      </List>
      <Divider />
      <List>
        <DrawerItem title="Notificaciones" icon={Notifications} to="/notifications" />
        <DrawerItem title="Ajustes" icon={Settings} onClick={openSettings} />
      </List>
    </div>
  );
};

export default FlussDrawerBody;
