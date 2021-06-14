import { IconButton, ListItem, ListItemIcon, ListItemText, Popover } from "@material-ui/core";
import { Edit, Equalizer, MoreHoriz } from "@material-ui/icons";
import React, { FC, MouseEvent, useState } from "react";

interface ActionsProps {
  moduleId: string;
  onEdit: (moduleId: string) => void;
}

const Actions: FC<ActionsProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? "user-menu-popover" : undefined;

  const openActions = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeActions = () => {
    setAnchorEl(null);
  };

  const onEdit = () => {
    props.onEdit(props.moduleId);
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
        <ListItem button onClick={onEdit}>
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

export default Actions;
