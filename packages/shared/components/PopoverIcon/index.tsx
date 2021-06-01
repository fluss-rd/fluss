import {
  Button,
  IconButton,
  IconButtonProps,
  Popover,
  PopoverOrigin,
  PopoverProps,
  SvgIconTypeMap,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import React, { FC, MouseEvent, ReactNode, useRef, useState } from "react";

import generateId from "../../helpers/generateId";

interface PopoverIconProps {
  title?: string; // When title is provided it adds padding formating.
  tooltipText?: string; // The text that shows the tooltip text when mouse is over.
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  labeled?: boolean; // Indicates wheter the icon button will have a label at its right or not. The text value will be the title or tooltipTextProvided.
  children?: ReactNode; // The Popover content.
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  IconButtonProps?: Partial<IconButtonProps>;
  PopoverProps?: Partial<PopoverProps>;
}

const PopoverIcon: FC<PopoverIconProps> = (props) => {
  const classes = useStyles(props);
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
      <Tooltip title={props.tooltipText || props.title}>
        {props.labeled ? (
          <Button
            aria-describedby={id}
            startIcon={<Icon />}
            onClick={handleClick}
            className={classes.labeled}
          >
            <Typography variant="body1" style={{ marginLeft: theme.spacing(1) }}>
              {props.title || props.tooltipText}
            </Typography>
          </Button>
        ) : (
          <IconButton aria-describedby={id} onClick={handleClick} {...props.IconButtonProps}>
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
        {...(props.IconButtonProps as any)}
      >
        <div className={classes.root}>
          {props.title && (
            <Typography variant="body1" className={classes.title}>
              {props.title.toUpperCase()}
            </Typography>
          )}
          <div className={classes.content}>{props.children}</div>
        </div>
      </Popover>
    </div>
  );
};

const useStyles = makeStyles<Theme, PopoverIconProps>((theme) => {
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
      padding: ({ title }) => (title ? `0px ${spacing}px ${spacing}px ${spacing}px` : undefined),
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
  PopoverProps: {},
  IconButtonProps: {},
};

export default PopoverIcon;
