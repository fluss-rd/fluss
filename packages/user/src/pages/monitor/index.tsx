import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FolderIcon from "@material-ui/icons/Folder";
import MeasureReport from "fragments/datos-y-reportes/MeasureReport";
import React, { FC } from "react";
import Map from "shared/components/Map";

const DataAndReports: FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Map />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
}));

export default DataAndReports;
