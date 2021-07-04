import { Divider, List } from "@material-ui/core";
import { Grain, Home, Lock, Notifications, People, Settings, ViewModule } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { FC } from "react";

import DrawerItem from "./DrawerItem";

interface FlussDrawerBodyProps {
  openSettings: () => void;
}

const FlussDrawerBody: FC<FlussDrawerBodyProps> = ({ openSettings }) => {
  const router = useRouter();
  return (
    <div>
      <List>
        <DrawerItem title="Inicio" icon={Home} to="/" />
        <DrawerItem title="Cuerpos hídricos" icon={Grain} to="/watersheds" />
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
