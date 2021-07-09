import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  IconButton,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Battery20, KeyboardArrowRight, LocationOff, Notifications } from "@material-ui/icons";
import { NotificationCategory } from "models/Notification";
import React, { FC } from "react";
import formatDate from "shared/helpers/formatDate";

interface NotificationItemProps {
  moduleId: string;
  riverId: string;
  message: string;
  category: NotificationCategory;
  date: Date;
}

const NotificationItem: FC<NotificationItemProps> = (props) => {
  const classes = useStyles();
  const Icon = chooseIcon(props.category);
  const dateDescription = formatDate(props.date, { type: "descriptive" });

  return (
    <Card>
      <CardActionArea className={classes.card}>
        <div>
          <Avatar className={classes.avatar}>
            <Icon fontSize="large" />
          </Avatar>
          <ListItem>
            <ListItemText primary={props.message} secondary={dateDescription} />
          </ListItem>
        </div>
        <div>
          <IconButton>
            <KeyboardArrowRight />
          </IconButton>
        </div>
      </CardActionArea>
    </Card>
  );
};

function chooseIcon(category: NotificationCategory) {
  switch (category) {
    case "battery":
      return Battery20;
    case "unexpectedLocation":
      return LocationOff;
    default:
      return Notifications;
  }
}

const useStyles = makeStyles((theme) => ({
  card: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: "flex",
    "& > div:first-child": {
      flex: 1,
      display: "flex",
      alignItems: "center",
    },
    "& > div:not(:first-child)": {
      display: "flex",
      alignItems: "center",
    },
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: red[50],
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default NotificationItem;
