import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import router from "next/router";
import React, { FC } from "react";

interface DrawerItemProps {
  icon?: React.ComponentType;
  title: string;
  to?: string;
  expanded?: boolean;
  onClick?: () => void;
  nested?: boolean;
}

const DrawerItem: FC<DrawerItemProps> = ({ icon: Icon, title, to, expanded, onClick, nested }) => {
  const classes = useStyles({ nested });

  function handleClick() {
    if (onClick) onClick();
    if (to) router.push(to);
  }

  return (
    <ListItem onClick={handleClick} button={true} className={classes.nested}>
      {Icon ? <ListItemIcon>{<Icon />}</ListItemIcon> : null}
      <ListItemText primary={title} />
      {expanded === undefined ? null : expanded ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
  );
};

interface StylesProps {
  nested?: boolean;
}

const useStyles = makeStyles<Theme, StylesProps>((theme: Theme) => ({
  nested: {
    paddingLeft: ({ nested }) => (nested ? theme.spacing(4) : undefined),
  },
}));

export default DrawerItem;
