import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import Map from "components/Map";
import formatDate from "shared/helpers/formatDate";

interface WatershedCardProps {
  id: string;
  name: string;
  modulesQuantity: number;
  wqiValue: number;
  lastUpdate: Date;
}

const WatershedCard: FC<WatershedCardProps> = (props) => {
  const classes = useStyles();
  const lastUpdate = formatDate(props.lastUpdate);

  return (
    <Card className={classes.root} variant="outlined">
      <Grid container spacing={2}>
        <Grid item md={7} className={classes.content}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h5">{props.name}</Typography>
            <Typography variant="h6" color="secondary">
              WQI {props.wqiValue}
            </Typography>

            <br />

            <table>
              <tbody>
                <tr>
                  <td>
                    <Typography>Módulos registrados:</Typography>
                  </td>
                  <td>
                    <Typography>{props.modulesQuantity}</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography>Última actualización:</Typography>
                  </td>
                  <td>
                    <Typography>{lastUpdate}</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>

          <CardActions>
            <Button size="small" color="primary">
              Ver más
            </Button>
          </CardActions>
        </Grid>
        <Grid item md={5} className={classes.map}>
          <Map />
        </Grid>
      </Grid>
    </Card>
  );
};

const useStyles = makeStyles({
  root: {},
  content: {
    display: "flex",
    flexDirection: "column",
  },
  map: {
    minHeight: 250,
  },
});

export default WatershedCard;

