import { yupResolver } from "@hookform/resolvers";
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
import { useGetModule } from "hooks/modules-service";
import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { ModuleForm } from "services/modules/models";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import FormSelect from "shared/components/FormSelect";
import Transition from "shared/components/Transition";
import * as yup from "yup";

import ModuleLocation from "./ModuleLocation";

interface ViewModuleProps {
  open?: boolean;
  close?: () => void;
  moduleId: string;
}

const ViewModule: FC<ViewModuleProps> = (props) => {
  const classes = useStyles();
  const [locations] = useState([]);
  const { handleSubmit, errors: formErrors, register, reset } = useForm<ModuleForm>({
    resolver: yupResolver(formSchema),
  });
  const moduleQuery = useGetModule(props.moduleId, {
    enabled: false,
    onSuccess: (fetchResponse) => reset(fetchResponse?.data),
  });

  // Initialize module form initial data.
  useEffect(() => {
    if (props.open) moduleQuery.refetch();
  }, [props.open]);

  const onSubmit = () => (data: ModuleForm) => console.log(data);

  return (
    <Dialog fullScreen open={props.open} onClose={props.close} TransitionComponent={Transition}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <AppBar color="inherit" elevation={0} style={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.close} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Información de módulo
            </Typography>
            <Button color="inherit" type="submit">
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
                        {() => (
                          <FormField
                            label="Numéro celular"
                            name="phoneNumber"
                            inputRef={register}
                            error={!!formErrors.phoneNumber}
                            helperText={formErrors.phoneNumber?.message}
                          />
                        )}
                      </ReactInputMask>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormField
                        name="serial"
                        label="Serial"
                        inputRef={register}
                        error={!!formErrors.serial}
                        helperText={formErrors.serial?.message}
                      />
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
                      <FormField
                        name="location.latitude"
                        label="Latitud"
                        type="number"
                        inputRef={register}
                        error={!!formErrors.location?.latitude}
                        helperText={formErrors.location?.latitude?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormField
                        name="location.longitude"
                        label="Longitud"
                        type="number"
                        inputRef={register}
                        error={!!formErrors.location?.longitude}
                        helperText={formErrors.location?.longitude?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormSelect
                        name="riverId"
                        noneText="Ninguno"
                        label="Cuerpo hídrico"
                        selectRef={register}
                        error={!!formErrors.riverId}
                        helperText={formErrors.riverId?.message}
                      >
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
  );
};

const formSchema: yup.SchemaOf<ModuleForm> = yup.object().shape({
  phoneNumber: yup.string().required("Por favor, introduzca el número de teléfono del módulo"),
  riverId: yup
    .string()
    .required("Por favor, seleccione el cuerpo hídrico al que pertenece el módulo"),
  serial: yup.string().required("Por favor, introduzca el serial del módulo"),
  location: yup.object().shape({
    latitude: yup
      .number()
      .typeError("La latitud ingresada noes válida, debe ser un número")
      .required("Debe inidicar la latitud de la ubicación del módulo"),
    longitude: yup
      .number()
      .typeError("La longitud ingresada noes válida, debe ser un número")
      .required("Debe inidicar la longitud de la ubicación del módulo"),
  }),
});

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

export default ViewModule;
