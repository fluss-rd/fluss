import { Drawer, List, ListItem, ListItemText, Link, Divider } from "@material-ui/core";
import React, { FC } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import FlussLogo from "shared/components/FlussLogo";

interface FlussDrawerProps {}

interface FlussDrawerProps {
  isOpen?: boolean;
  close?: () => void;
  goTo?: (sectionId: string) => () => void;
}

const FlussDrawer: FC<FlussDrawerProps> = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const push = (path: string) => () => router.push(path);

  return (
    <Drawer anchor="left" open={props.isOpen} onClose={props.close}>
      <div className={classes.toolbar}>
        <FlussLogo imagePath="/images/logo.png" darkImagePath="/images/logo_image_dark.png" />
      </div>
      <Divider />
      <List>
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
          <ListItemText
            primary={
              <Link href="https://fluss-help.vercel.app/faq" target="_blank" color="textPrimary">
                Ayuda
              </Link>
            }
          />
        </ListItem>
        <Divider />
        <ListItem button onClick={push("/monitor")} color="primary">
          <ListItemText primary="Monitor" />
        </ListItem>
      </List>
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default FlussDrawer;

