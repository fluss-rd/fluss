import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Fab,
  MenuItem,
  Grid,
  Card,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import useBoolean from "hooks/useBoolean";
import React, { FC, useState } from "react";
import FormField from "shared/components/FormField";
import ModalContent from "shared/components/ModalContent";
import FormIconTitle from "shared/components/FormIconTitle";
import { LocationOn } from "@material-ui/icons";
import { Location } from "components/Map";
import Map from "components/Map";

interface AddWatershedProps {}

const AddWatershed: FC<AddWatershedProps> = (props) => {
  const [markers, setMarkers] = useState<Location[]>([{ latitude: 19.8401, longitude: -71.687 }]);
  const [isOpen, open, close] = useBoolean();
  const classes = useStyles();

  const onNewMarker = (location: Location) => {
    console.log(location);
    setMarkers([{ ...location }]);
  };

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={open}>
        <Add />
        Registrar cuenca
      </Fab>
      <Dialog
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Registrar cuerpo hídrico</DialogTitle>

        <br />

        <form noValidate autoComplete="off">
          <ModalContent spacing={3}>
            <FormField name="name" label="Nombre" />

            <FormIconTitle Icon={LocationOn} title="Ubicación" />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormField name="latitude" label="Longitud" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField name="longitude" label="Latitud" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" style={{ width: "100%", height: 250 }}>
                  <Map locations={markers} onClick={onNewMarker} />
                </Card>
              </Grid>
            </Grid>
          </ModalContent>
          <DialogActions>
            <Button onClick={close} color="primary">
              Cancelar
            </Button>
            <Button color="primary" type="submit">
              Registrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

export default AddWatershed;

