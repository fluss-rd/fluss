import React, { FC } from "react";
import { List, Divider } from "@material-ui/core";
import DrawerItem from "./DrawerItem";
import { Home, Grain, People, Lock, Notifications, Settings } from "@material-ui/icons";

interface FlussDrawerBodyProps {}

const FlussDrawerBody: FC<FlussDrawerBodyProps> = () => {
  return (
    <div>
      <List>
        <DrawerItem title="Inicio" icon={Home} />
        <DrawerItem title="Cuerpos hídricos" icon={Grain} />
        <DrawerItem title="Usuarios" icon={People} />
        <DrawerItem title="Roles y permisos" icon={Lock} />
      </List>
      <Divider />
      <List>
        <DrawerItem title="Notificaiones" icon={Notifications} />
        <DrawerItem title="Ajustes" icon={Settings} />
      </List>
    </div>
  );
};

export default FlussDrawerBody;

