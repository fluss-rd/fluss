import {
  AppBar,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Close, EditLocationOutlined, InfoOutlined } from "@material-ui/icons";
import InfoIcon from "@material-ui/icons/Info";
import { FC, useState } from "react";
import ReactInputMask from "react-input-mask";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import FormSelect from "shared/components/FormSelect";
import Transition from "shared/components/Transition";

import ModuleLocation from "./ModuleLocation";

interface InfoIconButtonProps {
  index: string;
}

const InfoIconButton: FC<InfoIconButtonProps> = () => {
  const classes = useStyles();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [locations] = useState([]);

  const closeDialog = () => setDialogIsOpen(false);
  const openDialog = () => setDialogIsOpen(true);

  return (
    <>
      <IconButton onClick={openDialog}>
        <InfoIcon color="action" style={{ cursor: "pointer" }} />
      </IconButton>

      <Dialog fullScreen open={dialogIsOpen} onClose={closeDialog} TransitionComponent={Transition}>
        <form>
          <AppBar color="inherit" elevation={0} style={{ position: "relative" }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="close">
                <Close />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Información de módulo
              </Typography>
              <Button color="inherit" onClick={() => {}}>
                Guardar cambios
              </Button>
            </Toolbar>
            <Divider />
          </AppBar>
          <div className={classes.content}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  {/* Data */}
                  <Grid item xs={12}>
                    <FormIconTitle Icon={InfoOutlined} title="Detalle" />
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <ReactInputMask mask="(999) 999-9999" maskChar=" ">
                          {() => <FormField label="Numéro celular" />}
                        </ReactInputMask>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormField name="serial" label="Serial" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormField
                          name="creationDate"
                          label="Fecha de registro"
                          type="date"
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Location */}
                  <Grid item xs={12}>
                    <FormIconTitle Icon={EditLocationOutlined} title="Ubicación" />
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormField name="latitude" label="Latitud" type="number" />
                      </Grid>
                      <Grid item xs={12}>
                        <FormField name="longitude" label="Longitud" type="number" />
                      </Grid>
                      <Grid item xs={12}>
                        <FormSelect noneText="Ninguno" label="Cuerpo hídrico">
                          {locations.map((location, i) => (
                            <MenuItem key={i} value={location}>
                              {location}
                            </MenuItem>
                          ))}
                        </FormSelect>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <ModuleLocation onNewMarker={(l, g) => {}} />
                  <br />
                  <Typography style={{ fontWeight: "bold" }} color="textSecondary">
                    Ubicación
                  </Typography>
                  <Typography color="textSecondary">{"River"}</Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </form>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    padding: theme.spacing(3),
    width: "100%",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default InfoIconButton;
