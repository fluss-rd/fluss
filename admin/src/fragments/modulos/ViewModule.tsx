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
import { useGetRivers } from "hooks/rivers-service";
import Module from "models/Module";
import River from "models/River";
import { ChangeEvent, FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { ModuleForm } from "services/modules/models";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import FormSelect from "shared/components/FormSelect";
import Transition from "shared/components/Transition";
import { formatDate } from "shared/helpers";
import * as yup from "yup";

import ModuleLocation from "./ModuleLocation";

interface ViewModuleProps {
  open?: boolean;
  close?: () => void;
  moduleId: string;
}

const ViewModule: FC<ViewModuleProps> = (props) => {
  const classes = useStyles();
  const form = useForm<ModuleForm>({ resolver: yupResolver(formSchema) });
  const { handleSubmit, errors, register, reset, control, setValue } = form;
  const riversQuery = useGetRivers({ enabled: false });
  const moduleQuery = useGetModule(props.moduleId, {
    enabled: false,
    onSuccess: (response) => {
      // Initialize module form initial data.
      if (response?.data) {
        const defaultValues = Module.toModuleForm(response.data);
        reset(defaultValues);
      }
    },
  });
  const module: Module = moduleQuery.data?.data || ({} as Module);
  const rivers: River[] = riversQuery.data?.data || [];

  // Refetch module data on dialog opening.
  useEffect(() => {
    if (props.open) {
      moduleQuery.refetch();
      riversQuery.refetch();
    }
  }, [props.open]);

  // Register riverId to the form.
  useEffect(() => {
    if (props.open) register("riverId");
  }, [register]);

  // Update the module data when the form is submitted.
  const onSubmit = () => (data: ModuleForm) => console.log(data);

  // Update the riverId value when the river name changes.
  const onRiverIdChange = (e: ChangeEvent<{ name: string; value: string }>) => {
    if (!riversQuery.data?.data) return;

    const riverName = e.target.value;
    const riverMatch = riversQuery.data.data.find((river) => river.name === riverName);

    setValue("riverId", riverMatch?.id || "", { shouldValidate: true });
  };

  const changeLocation = (latitude: number, longitude: number) => {
    form.setValue("location.latitude", latitude);
    form.setValue("location.longitude", longitude);
  };

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
          <Grid container spacing={3}>
            {/* Dates */}
            <Grid item xs={12} className={classes.dates}>
              <FormField
                disabled
                underlined
                fullWidth={false}
                variant="standard"
                value={formatDate(module.createdAt, { type: "dateAndTime" })}
                label="Fecha de registro"
              />
              <FormField
                disabled
                underlined
                fullWidth={false}
                variant="standard"
                value={formatDate(new Date(module.updatedAt), { type: "dateAndTime" })}
                label="Última actualización"
              />
            </Grid>
            {/* Data */}
            <Grid item xs={12}>
              <FormIconTitle Icon={InfoOutlined} title="Detalle" />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="phoneNumber"
                    defaultValue=""
                    control={control}
                    as={
                      <ReactInputMask mask="(999) 999-9999">
                        {() => (
                          <FormField
                            label="Numéro celular"
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                          />
                        )}
                      </ReactInputMask>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormField
                    name="serial"
                    label="Serial"
                    inputRef={register}
                    error={!!errors.serial}
                    helperText={errors.serial?.message}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* Location */}
            <Grid item xs={12}>
              <FormIconTitle Icon={EditLocationOutlined} title="Ubicación" />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    {moduleQuery.data?.data?.riverName && rivers.length && (
                      <Grid item xs={12}>
                        <FormSelect
                          noneText="Ninguno"
                          label="Cuerpo hídrico"
                          error={!!errors.riverId}
                          helperText={errors.riverId?.message}
                          onChange={onRiverIdChange}
                          defaultValue={module.riverName}
                        >
                          {rivers.map((river: River) => (
                            <MenuItem key={river.id} value={river.name}>
                              {river.name}
                            </MenuItem>
                          ))}
                        </FormSelect>
                      </Grid>
                    )}
                    <Grid item xs={12} md={6}>
                      <FormField
                        name="location.latitude"
                        label="Latitud"
                        type="number"
                        inputRef={register}
                        error={!!errors.location?.latitude}
                        helperText={errors.location?.latitude?.message}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormField
                        name="location.longitude"
                        label="Longitud"
                        type="number"
                        inputRef={register}
                        error={!!errors.location?.longitude}
                        helperText={errors.location?.longitude?.message}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <ModuleLocation onNewMarker={changeLocation} />
                    <br />
                    <Typography style={{ fontWeight: "bold" }} color="textSecondary">
                      Ubicación
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </form>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    padding: theme.spacing(3),
    width: "100%",
  },
  dates: {
    display: "flex",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      "& > *:not(:last-child)": {
        marginRight: 0,
        marginBottom: theme.spacing(2),
      },
    },
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const formSchema: yup.SchemaOf<ModuleForm> = yup.object().shape({
  phoneNumber: yup.string().required("Por favor, introduzca el número de teléfono del módulo"),
  riverId: yup
    .string()
    .required("Por favor, seleccione el cuerpo hídrico donde el módulo se encuentra ubicado"),
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

export default ViewModule;
