import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Map from "components/Map";
import { useRouter } from "next/router";
import React, { FC } from "react";
import formatDate from "shared/helpers/formatDate";
import Location from "shared/models/Location";

interface WatershedCardProps {
  id: string;
  name: string;
  modulesQuantity: number;
  wqiValue: number;
  lastUpdate: Date;
  location: Location;
  onViewMore?: (watershedId: string) => void;
  onEdit?: (watershedId: string) => void;
}

const WatershedCard: FC<WatershedCardProps> = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const onViewMore = () => {
    if (props.onViewMore) {
      props.onViewMore(props.id);
    }
  };

  const onEdit = () => {
    if (props.onEdit) props.onEdit(props.id);
  };

  console.log(formatDate(new Date(2021, 6, 11)));

  return (
    <Card className={classes.root}>
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
                    <Typography>{formatDate(props.lastUpdate)}</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>

          <CardActions>
            <Button size="small" color="primary" onClick={onViewMore}>
              Ver más
            </Button>
            <Button size="small" color="primary" onClick={onEdit}>
              Editar
            </Button>
          </CardActions>
        </Grid>
        <Grid item md={5} className={classes.map}>
          <Map locations={[props.location]} />
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

