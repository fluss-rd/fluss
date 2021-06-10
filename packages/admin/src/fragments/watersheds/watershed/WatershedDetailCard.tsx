import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  SvgIconTypeMap,
  Typography,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore, Room, Update, ViewModule } from "@material-ui/icons";
import clsx from "clsx";
import Watershed from "models/watershed";
import React, { FC, useState } from "react";
import formatDate from "shared/helpers/formatDate";

import EditWatershed from "../EditWatershed";

interface WatershedDetailCardProps {
  watershed: Watershed;
}

const WatershedDetailCard: FC<WatershedDetailCardProps> = ({ watershed }) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(true);

  const onToggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Card className={classes.card} elevation={0} variant="outlined">
      <CardContent>
        <Typography variant="h5">{watershed.name}</Typography>
        <Typography variant="h6" color="textSecondary">
          WQI {watershed.wqi.value}
        </Typography>
      </CardContent>
      <Collapse in={isExpanded} timeout="auto">
        <CardContent>
          <Grid container spacing={2}>
            <Item icon={ViewModule}>
              <Typography>{watershed.modulesQuantity} módulos en total</Typography>
            </Item>
            <Item icon={Room}>
              <Typography>Latitud: {watershed.location.latitude}</Typography>
              <Typography>Longitud: {watershed.location.longitude}</Typography>
            </Item>
            <Item icon={Update}>
              <Typography>
                Último cambio: {formatDate(watershed.updateDate, { type: "dateAndTime" })}
              </Typography>
              <Typography>
                Fecha de registro: {formatDate(watershed.creationDate, { type: "dateAndTime" })}
              </Typography>
            </Item>
          </Grid>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <EditWatershed watershedId={watershed.id} text="Editar registro" />
        <IconButton
          onClick={onToggleExpansion}
          className={clsx(classes.expand, {
            [classes.expandOpen]: isExpanded,
          })}
          aria-expanded={isExpanded}
          aria-label="Mostrar más"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

interface ItemProps {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const Item: FC<ItemProps> = ({ icon: Icon, children }) => (
  <Grid item xs={12}>
    <Grid container spacing={2}>
      <Grid item>
        <Icon />
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  </Grid>
);

export default WatershedDetailCard;
