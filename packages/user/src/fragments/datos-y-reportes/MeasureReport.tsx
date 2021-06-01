import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Close, GetApp } from "@material-ui/icons";
import ModuleMeasure from "models/ModuleMeasure";
import React, { FC, useMemo } from "react";
import { filterNumberWithConditions, NumberRangeColumnFilter } from "shared/components/Tables";
import DataTable, { DataTableColumn, DataTableProvider } from "shared/components/Tables/DataTable";
import { useMergeState } from "shared/hooks";

import BarsChartSection from "./BarsChartSection";
import MeasuresReportToolbar from "./MeasuresReportToolbar";

interface MeasureReportProps {}

const MeasureReport: FC<MeasureReportProps> = (props) => {
  // Computed.
  const classes = useStyles();
  const granularityList = useMemo(() => ["Semanal", "Mensual", "Anual"], []);
  const rivers = useMemo(() => ["Yaque del Norte", "Yaque del Sur"], []);
  const data = useMemo(() => ModuleMeasure.mockData(), []);
  const columns = useMemo(
    () =>
      [
        {
          Header: "Momento",
          accessor: "moment",
        },
        {
          Header: "Oxígeneo",
          accessor: "oxygen",
          filter: filterNumberWithConditions,
          Filter: NumberRangeColumnFilter,
        },
        {
          Header: "pH",
          accessor: "pH",
          filter: filterNumberWithConditions,
          Filter: NumberRangeColumnFilter,
        },
        {
          Header: "Temperatura",
          accessor: "temperature",
          filter: filterNumberWithConditions,
          Filter: NumberRangeColumnFilter,
        },
        {
          Header: "Turbidez",
          accessor: "turbidity",
          filter: filterNumberWithConditions,
          Filter: NumberRangeColumnFilter,
        },
        {
          Header: "Sólidos disueltos",
          accessor: "dissolvedSolids",
          filter: filterNumberWithConditions,
          Filter: NumberRangeColumnFilter,
        },
      ] as DataTableColumn<ModuleMeasure>[],
    []
  );

  // State.
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useMergeState({ granularity: granularityList[0], river: rivers[0] });

  // Functions.
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="text" color="primary" onClick={handleClickOpen}>
        Ver reporte
      </Button>
      <DataTableProvider data={data} columns={columns} sortBy="moment" paginated={false}>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar} color="inherit" elevation={0}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <Close />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Reporte de parámetros
              </Typography>
              <Button color="primary" onClick={handleClose} startIcon={<GetApp />}>
                Descargar
              </Button>
            </Toolbar>
            <Divider />
          </AppBar>
          <MeasuresReportToolbar />
          <div className={classes.content}>
            <BarsChartSection />
            <br />

            <Typography variant="h5">Tabla de datos</Typography>
            <br />

            <DataTable densed columns={columns} data={data} paginated={false} elevation={0} />
          </div>
        </Dialog>
      </DataTableProvider>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settings: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
  columnsAndFilters: {
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
  content: {
    padding: theme.spacing(2),
    height: 300,
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default MeasureReport;
