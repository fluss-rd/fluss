import {
  AppBar,
  Button,
  ButtonGroup,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { darken, lighten, makeStyles, useTheme } from "@material-ui/core/styles";
import { Close, GetApp } from "@material-ui/icons";
import { ResponsiveCalendar } from "@nivo/calendar";
import useBoolean from "hooks/useBoolean";
import { mockDayMeasures } from "models/day-measures";
import { mockModules } from "models/module";
import React, { FC, useMemo, useState } from "react";
import ModalContent from "shared/components/ModalContent";
import { appBarHeight } from "shared/helpers";

import ModuleDataDownload from "./ModuleDataDownload";

interface ModuleDataProps {
  moduleId: string;
  isOpen: boolean;
  close: () => void;
}

const ModuleData: FC<ModuleDataProps> = ({ isOpen, close, moduleId }) => {
  const [downloadDataIsOpen, openDownloadData, closeDownloadData] = useBoolean();
  const [current, setCurrent] = useState(0);
  const classes = useStyles();
  const measures = useMemo(() => mockDayMeasures(), []);
  const module = mockModules().find((m) => m.id === moduleId);

  const onParameterChange = (index: number) => {
    setCurrent(index);
  };

  return (
    <>
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
            <Button color="primary" startIcon={<GetApp />} onClick={openDownloadData}>
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
              <SelectButton index={0} value={current} onClick={onParameterChange}>
                pH
              </SelectButton>
              <SelectButton index={1} value={current} onClick={onParameterChange}>
                Oxígeno
              </SelectButton>
              <SelectButton index={2} value={current} onClick={onParameterChange}>
                Temperatura
              </SelectButton>
              <SelectButton index={3} value={current} onClick={onParameterChange}>
                Sólidos disueltos
              </SelectButton>
              <SelectButton index={4} value={current} onClick={onParameterChange}>
                Turbidez
              </SelectButton>
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
      <ModuleDataDownload isOpen={downloadDataIsOpen} close={closeDownloadData} />
    </>
  );
};

interface SelectButtonProps {
  index: number;
  value: number;
  onClick: (index: number) => void;
}

const SelectButton: FC<SelectButtonProps> = ({ index, value, onClick, ...props }) => {
  const theme = useTheme();
  const selected = index === value;

  const handleClick = () => {
    onClick(index);
  };

  return (
    <Button
      style={{ background: selected && lighten(theme.palette.primary.main, 0.8) }}
      onClick={handleClick}
      {...props}
    >
      {props.children}
    </Button>
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
