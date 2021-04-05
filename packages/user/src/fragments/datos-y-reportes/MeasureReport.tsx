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
import { Close, GetApp } from "@material-ui/icons";
import React, { FC, useMemo } from "react";
import { useMergeState } from "shared/hooks";

import ReportSetting from "./ReportSetting";
import { TransitionProps } from "@material-ui/core/transitions/transition";

interface MeasureReportProps {}

const MeasureReport: FC<MeasureReportProps> = (props) => {
  // State.
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useMergeState({ granularity: "hey", river: "" });

  // Computed.
  const classes = useStyles();
  const granularity = useMemo(() => ["Semanal", "Mensual", "Anual"], []);
  const rivers = useMemo(() => ["Yaque del Norte", "Yaque del Sur"], []);

  // Functions.
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} color="inherit" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Reporte de parámetros
            </Typography>
            <Button
              color="primary"
              onClick={handleClose}
              startIcon={<GetApp />}
            >
              Descargar
            </Button>
          </Toolbar>
          <Divider />
        </AppBar>
        <AppBar className={classes.appBar} color="inherit" elevation={1}>
          <Toolbar>
            <ReportSetting
              title="Granularidad"
              value={state.granularity}
              settings={granularity}
            />
            <ReportSetting
              title="Cuerpos hídricos"
              value={state.river}
              settings={rivers}
            />
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
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
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default MeasureReport;

