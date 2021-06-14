import {
  Typography,
  IconButton,
  Popover,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
} from "@material-ui/core";
import { MoreHoriz, Edit, Equalizer } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useState, MouseEvent } from "react";

interface ActionsProps {}

const Actions: FC<ActionsProps> = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? "user-menu-popover" : undefined;

  const openActions = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeActions = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={openActions}>
        <MoreHoriz />
      </IconButton>
      <Popover
        id={popoverId}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={closeActions}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Editar" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Equalizer />
          </ListItemIcon>
          <ListItemText primary="Ver datos" />
        </ListItem>
      </Popover>
    </>
  );
};

const useStyles = makeStyles({});

export default Actions;

