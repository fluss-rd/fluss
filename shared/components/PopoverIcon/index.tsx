import {
  IconButton,
  Button,
  Popover,
  PopoverOrigin,
  SvgIconTypeMap,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import generateId from "../../helpers/generateId";
import React, { FC, MouseEvent, ReactNode, useRef, useState } from "react";

interface PopoverIconProps {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  labeled?: boolean;
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
  const popoverRef = useRef(null);
  const theme = useTheme();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(null);
  }

  return (
    <div>
      <Tooltip title={props.title}>
        {props.labeled ? (
          <Button
            aria-describedby={id}
            startIcon={<Icon />}
            onClick={handleClick}
            className={classes.labeled}
          >
            <Typography variant="body1" style={{ marginLeft: theme.spacing(1) }}>
              {props.title}
            </Typography>
          </Button>
        ) : (
          <IconButton aria-describedby={id} onClick={handleClick}>
            <Icon />
          </IconButton>
        )}
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={props.anchorOrigin}
        transformOrigin={props.transformOrigin}
        className={classes.popover}
        ref={popoverRef}
      >
        <div className={classes.root}>
          <Typography variant="body1" className={classes.title}>
            {props.title.toUpperCase()}
          </Typography>
          <div className={classes.content}>{props.children}</div>
        </div>
      </Popover>
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  const spacing = theme.spacing(2);
  return {
    popover: {},
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontWeight: "bold",
      padding: `${spacing}px ${spacing}px 0px ${spacing}px`,
      marginBottom: theme.spacing(1),
    },
    content: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: `0px ${spacing}px ${spacing}px ${spacing}px`,
    },
    labeled: {
      textTransform: "none",
    },
  };
});

PopoverIcon.defaultProps = {
  labeled: false,
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

