import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Update, ViewModule } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { FC } from "react";
import IconLabel from "shared/components/IconLabel";
import Map from "shared/components/Map";
import formatDate from "shared/helpers/formatDate";
import Location from "shared/models/Location";

interface WatershedCardProps {
  id: string;
  name: string;
  modulesQuantity: number;
  wqiValue: number;
  lastUpdate: Date;
  location: Location[];
  onViewMore?: (watershedId: string) => void;
  onEdit?: (watershedId: string) => void;
}

const WatershedCard: FC<WatershedCardProps> = (props) => {
  const classes = useStyles();

  const onViewMore = () => {
    if (props.onViewMore) {
      props.onViewMore(props.id);
    }
  };

  const onEdit = () => {
    if (props.onEdit) props.onEdit(props.id);
  };

  return (
    <Card className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} className={classes.content}>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h5">{props.name}</Typography>
            <Typography variant="h6" color="secondary">
              WQI {props.wqiValue}
            </Typography>

            <br />

            <IconLabel
              icon={<ViewModule />}
              title="Módulos registrados:"
              value={props.modulesQuantity}
            />

            <IconLabel
              icon={<Update />}
              alignIcon="flex-start"
              title={
                <div>
                  <Typography>
                    Última actualización: {formatDate(props.lastUpdate, { type: "dateAndTime" })}
                  </Typography>
                  <Typography>
                    Fecha de registro: {formatDate(props.lastUpdate, { type: "dateAndTime" })}
                  </Typography>
                </div>
              }
            />
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
        <Grid item xs={12} sm={6} className={classes.map}>
          <Map zoom={10} focusLocation={props.location} areas={[props.location]} />
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
    zIndex: 0,
  },
  table: {
    "& td": {
      background: "red",
      verticalAlign: "center",
    },
  },
});

export default WatershedCard;
