import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "@material-ui/core";
import React, { FC } from "react";
import { useRouter } from "next/router";
import { Home } from "@material-ui/icons";

interface FlussDrawerProps {}

interface FlussDrawerProps {
  isOpen?: boolean;
  close?: () => void;
  goTo?: (sectionId: string) => () => void;
}

const FlussDrawer: FC<FlussDrawerProps> = (props) => {
  const router = useRouter();
  const push = (path: string) => () => router.push(path);

  return (
    <Drawer anchor="left" open={props.isOpen} onClose={props.close}>
      <List>
        <ListItem button onClick={push("/monitor")}>
          <ListItemText primary="Monitor" />
        </ListItem>
        <ListItem button onClick={props.goTo("welcome")}>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button onClick={props.goTo("about-us")}>
          <ListItemText primary="¿Quiénes somos?" />
        </ListItem>
        <ListItem button onClick={props.goTo("contact")}>
          <ListItemText primary="Contacto" />
        </ListItem>
        <ListItem button>
          <ListItemText primary={<Link href="https://fluss-help.vercel.app/faq" target="_blank" color="textPrimary">Ayuda</Link>} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default FlussDrawer;

