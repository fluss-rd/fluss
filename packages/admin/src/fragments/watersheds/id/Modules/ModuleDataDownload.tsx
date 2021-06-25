import {
  Button,
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
import React, { FC } from "react";

interface ModuleDataDownloadProps {
  isOpen: boolean;
  close: () => void;
}

const ModuleDataDownload: FC<ModuleDataDownloadProps> = ({ isOpen, close }) => {
  const classes = useStyles();

  const onCancel = () => {
    close();
  };

  const onSave = () => {
    console.log("onSave");
  };

  return (
    <div>
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
            {/*<FormHelperText>Debes elegir al menos un parámetro para la descarga</FormHelperText>*/}
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
    </div>
  );
};

const useStyles = makeStyles({});

export default ModuleDataDownload;
