import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { Close, GetApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useMemo } from "react";
import { mockDayMeasures } from "models/day-measures";
import ModalContent from "shared/components/ModalContent";
import { ResponsiveCalendar } from "@nivo/calendar";
import { appBarHeight } from "shared/helpers";
import { mockModules } from "models/module";

interface ModuleDataProps {
  moduleId: string;
  isOpen: boolean;
  close: () => void;
}

const ModuleData: FC<ModuleDataProps> = ({ isOpen, close, moduleId }) => {
  const classes = useStyles();
  const measures = useMemo(() => mockDayMeasures(), []);
  const module = mockModules().find((m) => m.id === moduleId);

  return (
    <Dialog
      fullScreen
      onClose={close}
      open={isOpen}
      maxWidth="lg"
      aria-labelledby="form-dialog-title"
    >
      <AppBar position="fixed" color="transparent" elevation={0} variant="outlined">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={close}
          >
            <Close />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Datos de módulo
          </Typography>
          <Button color="primary" startIcon={<GetApp />}>
            Descargar datos
          </Button>
        </Toolbar>
      </AppBar>
      <ModalContent className={classes.content}>
        <div>
          <ButtonGroup
            size="large"
            color="primary"
            aria-label="large outlined primary button group"
          >
            <Button>pH</Button>
            <Button>Oxígeno</Button>
            <Button>Sólidos disueltos</Button>
            <Button>Temperatura</Button>
            <Button>Turbidez</Button>
          </ButtonGroup>
        </div>
        <ResponsiveCalendar
          data={measures}
          from="2015-03-01"
          to="2016-07-12"
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          margin={{ left: 40, right: 40 }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
        />
      </ModalContent>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    marginTop: appBarHeight(theme),
    paddingTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: `calc(100vh - 64px)`,
  },
}));

export default ModuleData;

