import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface DrawerItemProps {
  icon?: React.ComponentType;
  title: string;
  to?: string;
  expanded?: boolean;
  onClick?: () => void;
  nested?: boolean;
}

const FlussDrawreItem: FC<DrawerItemProps> = (props) => {
  const router = useRouter();
  const isSelected = router.pathname === props.to;
  const { icon: Icon, title, to, expanded, onClick, nested } = props;
  const classes = useStyles({ nested });

  function handleClick() {
    if (onClick) onClick();
    if (to) router.push(to);
  }

  function renderExpandIcon() {
    if (expanded === undefined) return null;
    else expanded ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <ListItem onClick={handleClick} button={true} className={classes.nested} selected={isSelected}>
      {Icon && <ListItemIcon>{<Icon />}</ListItemIcon>}
      <ListItemText primary={title} />
      {renderExpandIcon()}
    </ListItem>
  );
};

const useStyles = makeStyles<Theme, { nested: boolean }>((theme: Theme) => ({
  nested: {
    paddingLeft: ({ nested }) => (nested ? theme.spacing(4) : undefined),
  },
}));

export default FlussDrawreItem;
