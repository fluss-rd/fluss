import {
  IconButton,
  Popover,
  PopoverOrigin,
  SvgIconTypeMap,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { makeStyles } from "@material-ui/core/styles";
import React, {
  FC,
  MouseEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import generateId from "../../helpers/generateId";
import useSize from "../../hooks/useHeight";

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
  const popoverRef = useRef(null);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(null);
  }

  return (
    <>
      <Tooltip title={props.title}>
        <IconButton aria-describedby={id} onClick={handleClick}>
          <Icon />
        </IconButton>
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
    </>
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
  };
});

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
