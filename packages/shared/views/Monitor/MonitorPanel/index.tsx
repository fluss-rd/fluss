import {
  Collapse,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, ChangeEvent, useState } from "react";
import FormSelect from "../../../components/FormSelect";
import clsx from "clsx";
import { ExpandMore } from "@material-ui/icons";
import hexToHsl from "../../../helpers/hexToHsl";

import Leyend2 from "./WqiLegend";
import WqiPieChart, { PieChartData } from "./WqiPieChart";
import { mockWatersheds } from "../../../models/Watershed";
import { ratingToColor } from "../../../models/WqiRating";

interface WatershedsSelectCardProps {
  watershedId: string;
  onWatershedChange?: (watershedId: string) => void; // When there is no specific watershed Todos is the id passed.
}

const MonitorPanel: FC<WatershedsSelectCardProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const classes = useStyles();
  const watersheds = mockWatersheds();

  const onWatershed = (e: ChangeEvent<{ name?: string; value: string }>) => {
    const watershedId = e.target.value;

    if (props.onWatershedChange) {
      props.onWatershedChange(watershedId);
    }
  };

  const onToggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  console.log(hexToHsl(ratingToColor("excellent")));

  return (
    <div>
      <Card className={classes.card} elevation={0} variant="outlined">
        <CardContent>
          <FormSelect
            label="Cuerpo hídrico"
            noneText="Todos"
            noneValue="Todos"
            value={props.watershedId || "Todos"}
            onChange={onWatershed}
          >
            {watersheds.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </FormSelect>
        </CardContent>

        {isExpanded && <Divider />}
        <Collapse in={isExpanded} timeout="auto">
          <CardContent style={{ textAlign: "center" }}>
            <Typography variant="subtitle1" color="textSecondary" style={{ fontWeight: "bold" }}>
              Índice de Calidad del Agua (ICA)
            </Typography>
            <div style={{ width: "100%", height: 300, padding: 20 }}>
              <WqiPieChart data={data} />
            </div>
            <Leyend2 />
          </CardContent>
        </Collapse>

        <Divider />
        <CardActions disableSpacing>
          <Button color="primary">Descargar datos</Button>
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
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    width: "fit-content",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    alignItems: "flex-end",
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

export default MonitorPanel;

const data: Array<PieChartData> = [
  {
    id: "excellent",
    value: 2,
  },
];

