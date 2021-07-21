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

import WqiLegend from "../../../components/WqiLegend";
import useBoolean from "../../../hooks/useBoolean";
import ModuleDataDownload from "../../../components/ModuleDataDownload";
import PieChart, { PieChartData } from "../../../components/PieChart";
import WqiRating, { ratingToText, ratingToColor } from "../../../models/WqiRating";
import { useGetWatersheds, useGetWqiRatingsCount } from "../../../services/watersheds/hooks";

interface WatershedsSelectCardProps {
  watershedId: string;
  onWatershedChange?: (watershedId: string) => void; // When there is no specific watershed Todos is the id passed.
}

const MonitorPanel: FC<WatershedsSelectCardProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [downloadIsOpen, openDownload, closeDownload] = useBoolean();
  const countQuery = useGetWqiRatingsCount(props.watershedId);
  const watershedsQuery = useGetWatersheds();
  const watersheds = watershedsQuery?.data || [];
  const classes = useStyles();

  const onWatershed = (e: ChangeEvent<{ name?: string; value: string }>) => {
    const watershedId = e.target.value;

    if (props.onWatershedChange) {
      props.onWatershedChange(watershedId);
    }
  };

  const onToggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

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

        <Divider />

        <CardContent>
          <WqiLegend />
        </CardContent>

        <Divider />

        <Collapse in={isExpanded} timeout="auto">
          <CardContent style={{ textAlign: "center" }}>
            <Typography variant="subtitle1" color="textSecondary" style={{ fontWeight: "bold" }}>
              Índice de Calidad del Agua (ICA)
            </Typography>
            {countQuery.data?.length ? (
              <PieChart
                data={countQuery?.data || []}
                height={200}
                margin={{ left: 110, right: 110 }}
                outsideLabelColor="#FFFFFF"
                insideLabelColor="#FFFFFF"
                width="100%"
                formatOutsideLabel={({ data }) => ratingToText(data)}
                applyColor={({ data }) => ratingToColor(data)}
              />
            ) : (
              <Typography variant="caption">No se encuentran registros</Typography>
            )}
          </CardContent>
        </Collapse>

        {isExpanded && <Divider />}
        <CardActions disableSpacing>
          <Button color="primary" onClick={openDownload}>
            Descargar datos
          </Button>
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
      <ModuleDataDownload close={closeDownload} isOpen={downloadIsOpen} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    width: "fit-content",
    backgroundColor: `${theme.palette.background.default}CC`,
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

const data: Array<PieChartData<WqiRating>> = [
  {
    id: "excellent",
    value: 2,
    data: "excellent",
  },
  {
    id: "moderate",
    value: 2,
    data: "moderate",
  },
];

export default MonitorPanel;

