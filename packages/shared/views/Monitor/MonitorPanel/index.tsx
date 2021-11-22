import {
  Dialog,
  DialogTitle,
  AppBar,
  Toolbar,
  DialogContent,
  Hidden,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore } from "@material-ui/icons";
import clsx from "clsx";
import React, { ChangeEvent, FC, useState } from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";

import FormSelect from "../../../components/FormSelect";
import ModuleDataDownload from "../../../components/ModuleDataDownload";
import PieChart, { PieChartData } from "../../../components/PieChart";
import WqiLegend from "../../../components/WqiLegend";
import useBoolean from "../../../hooks/useBoolean";
import WqiRating, { ratingToColor, ratingToText } from "../../../models/WqiRating";
import { useGetWatersheds, useGetWqiRatingsCount } from "../../../services/watersheds/hooks";

interface WatershedsSelectCardProps {
  watershedId: string;
  onWatershedChange?: (watershedId: string) => void; // When there is no specific watershed Todos is the id passed.
}

const MonitorPanel: FC<WatershedsSelectCardProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [downloadIsOpen, openDownload, closeDownload] = useBoolean();
  const [detailsIsOpen, openDetails, closeDetails] = useBoolean();
  const countQuery = useGetWqiRatingsCount(props.watershedId);
  const watershedsQuery = useGetWatersheds();
  const watersheds = watershedsQuery?.data || [];
  const classes = useStyles();
  const theme = useTheme();
  const isInSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const onWatershed = (e: ChangeEvent<{ name?: string; value: string }>) => {
    const watershedId = e.target.value;

    if (props.onWatershedChange) {
      props.onWatershedChange(watershedId);
    }
  };

  const onToggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  const wqiChart = (
    <>
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
    </>
  );

  return (
    <div style={{ width: "100%" }}>
      <Card
        className={classes.card}
        elevation={0}
        variant={isInSmallDevice ? undefined : "outlined"}
      >
        <CardContent>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FormSelect
              className={classes.watershedSelect}
              label="Cuerpo hídrico"
              noneText="Todos"
              noneValue="Todos"
              value={props.watershedId || "Todos"}
              onChange={onWatershed}
              size={isInSmallDevice ? "small" : "medium"}
            >
              {watersheds.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </FormSelect>
            <Hidden mdUp implementation="js">
              <IconButton aria-label="delete" size="small" onClick={openDownload}>
                <GetAppIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="delete" size="small" onClick={openDetails}>
                <InfoIcon fontSize="inherit" />
              </IconButton>

              <Dialog
                onClose={closeDetails}
                aria-labelledby="simple-dialog-title"
                fullScreen={isInSmallDevice}
                open={detailsIsOpen}
              >
                <AppBar position="static" variant="outlined" color="transparent">
                  <Toolbar variant="dense">
                    <IconButton
                      edge="start"
                      style={{ marginRight: theme.spacing(2) }}
                      color="inherit"
                      aria-label="close"
                      onClick={closeDetails}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                      Índice de calidad del agua
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CardContent>
                  <Typography variant="body1">Gráfico de distribución:</Typography>
                </CardContent>
                <div>{wqiChart}</div>

                <Divider />
                <DialogContent>
                  <div>
                    <Typography variant="body1">Leyenda:</Typography>
                  </div>
                  <br />
                  <WqiLegend vertical />
                </DialogContent>
              </Dialog>
            </Hidden>
          </div>
        </CardContent>

        <Hidden mdDown>
          <Divider />

          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <WqiLegend />
          </CardContent>
          <Divider />

          <Collapse in={isExpanded} timeout="auto">
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="subtitle1" color="textSecondary" style={{ fontWeight: "bold" }}>
                Índice de Calidad del Agua (ICA)
              </Typography>

              {wqiChart}
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
        </Hidden>
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
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
      width: "100%",
      backgroundColor: "transparent",
      backdropFilter: "blur(0px)",
    },
  },
  watershedSelect: {
    [theme.breakpoints.down("md")]: {
      backgroundColor: `rgba(0, 0, 0, 0.5)`,
      backdropFilter: "blur(10px)",
    },
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

