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
    width: "100%",
    height: `100vh`,
  },
}));

export default DataAndReports;

