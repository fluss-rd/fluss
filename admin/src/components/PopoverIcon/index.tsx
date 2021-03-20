import { IconButton, Popover, PopoverOrigin, SvgIconTypeMap, Typography } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, MouseEvent, ReactNode, useState } from "react";

import generateId from "../../helpers/generateId";

interface PopoverIconProps {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  children?: ReactNode;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}

const PopoverIcon: FC<PopoverIconProps> = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const key = generateId("popover-icon");
  const open = Boolean(anchorEl);
  const id = open ? key : undefined;
  const Icon = props.icon;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Icon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={props.anchorOrigin}
        transformOrigin={props.transformOrigin}
      >
        <div className={classes.root}>
          <Typography variant="body1" className={classes.title}>
            {props.title}
          </Typography>
          {props.children}
        </div>
      </Popover>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
}));

PopoverIcon.defaultProps = {
  anchorOrigin: {
    vertical: "center",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "right",
  },
};

export default PopoverIcon;
