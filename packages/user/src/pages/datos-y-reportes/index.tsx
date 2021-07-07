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

const DataAndReports: FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4">Datos y reportes</Typography>
      <br />
      Fluss recolecta los siguiente datos de los cuerpos hídricos:
      <ul>
        <li>
          <Typography>Nivel de PH</Typography>
        </li>
        <li>
          <Typography>Oxígeno disuelto</Typography>
        </li>
        <li>
          <Typography>Temperatura</Typography>
        </li>
        <li>
          <Typography>Turbidez del agua</Typography>
        </li>
      </ul>
      <Typography variant="h5">Reportes</Typography>
      <br />
      <Typography variant="body1">A continuación, los reportes:</Typography>
      <br />
      <Card className={classes.card} elevation={0} variant="outlined">
        <CardContent className={classes.content}>
          <Avatar>
            <FolderIcon />
          </Avatar>
          <ListItemText
            primary="Parámetros de medición"
            secondary="Muestra los parámetros pH, oxígeno, sólidos disueltos, temperatura y turbidez"
          />
        </CardContent>
        <CardActions>
          <MeasureReport />
        </CardActions>
      </Card>
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
