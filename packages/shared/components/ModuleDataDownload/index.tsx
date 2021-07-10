import {
  Grid,
  Button,
  MenuItem,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useState, ChangeEvent } from "react";
import FormSelect from "../FormSelect";
import { mockWatersheds } from "../../models/Watershed";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import DateTimeRange from "../DateTimeRange";

interface ModuleDataDownloadProps {
  isOpen: boolean;
  close: () => void;
  watershedId?: string;
  moduleId?: string;
}

const ModuleDataDownload: FC<ModuleDataDownloadProps> = ({
  isOpen,
  close,
  watershedId,
  moduleId,
}) => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedWatershed, setSelectedWatershed] = useState(watershedId);
  const watersheds = mockWatersheds();

  const onCancel = () => {
    close();
  };

  const onSave = () => {
    console.log("onSave");
  };

  const onWatershedChange = (e: ChangeEvent<{ name?: string; value: string }>) => {
    const id = e.target.value;
    setSelectedWatershed(id);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
      onClose={close}
      open={isOpen}
      aria-labelledby="confirmation-dialog-title"
    >
      <DialogTitle id="confirmation-dialog-title">Descargar datos</DialogTitle>
      <DialogContent dividers>
        <FormSelect
          noneText="Todos"
          noneValue="Todos"
          label="Cuerpo hídrico"
          disabled={!!moduleId}
          value={selectedWatershed}
          onChange={onWatershedChange}
        >
          {watersheds.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </FormSelect>
        <br />
        <br />

        <FormLabel component="legend">Rango de fechas</FormLabel>
        <br />
        <DateTimeRange />

        <br />

        <FormControl component="fieldset">
          <FormLabel component="legend">Elegir parámetros</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox name="oxygen" checked />} label="Oxígeno" />
            <FormControlLabel control={<Checkbox name="pH" checked />} label="pH" />
            <FormControlLabel
              control={<Checkbox name="temperature" checked />}
              label="Temperatura"
            />
            <FormControlLabel
              control={<Checkbox name="solids" checked />}
              label="Sólidos disueltos"
            />
            <FormControlLabel control={<Checkbox name="turbidity" checked />} label="Turbidez" />
          </FormGroup>
          {/*TODO:<FormHelperText>Debes elegir al menos un parámetro para la descarga</FormHelperText>*/}
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Elegir formato</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Radio name="excel" />} label="Excel" />
            <FormControlLabel control={<Radio name="csv" />} label="CSV" />
            <FormControlLabel control={<Radio name="json" />} label="JSON" />
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={onSave} color="primary">
          Descargar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles({});

ModuleDataDownload.defaultProps = {
  watershedId: "Todos",
};

export default ModuleDataDownload;

