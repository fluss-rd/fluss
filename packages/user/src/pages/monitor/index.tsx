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
import { appBarHeight } from "shared/helpers";

const DataAndReports: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.map}>
      <Map />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  map: {
    height: `100vh`,
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
  },
}));

export default DataAndReports;

