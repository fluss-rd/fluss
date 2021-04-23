import { Grid, MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { EditLocationOutlined, InfoOutlined } from "@material-ui/icons";
import { useGetModule } from "hooks/modules-service";
import React, { FC, useState } from "react";
import { UseFormMethods } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { ModuleForm } from "services/modules/models";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import FormSelect from "shared/components/FormSelect";

import ModuleLocation from "./ModuleLocation";

interface ModuleFormFieldsProps {
  form: UseFormMethods<ModuleForm>;
  moduleId: string;
}

const ModuleFormFields: FC<ModuleFormFieldsProps> = (props) => {
  const classes = useStyles();
  const { data: response, isSuccess, refetch: refetchModule } = useGetModule(props.moduleId);
  const { register, errors: formErrors, trigger } = props.form;
  const [locations] = useState([]);

  return (
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
                        defaultValue={response?.data?.phoneNumber}
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
                    defaultValue={response?.data?.serial}
                    name="serial"
                    label="Serial"
                    inputRef={register}
                    error={!!formErrors.serial}
                    helperText={formErrors.serial?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormField
                    defaultValue={response?.data?.creationDate.toString()}
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
                    defaultValue={response?.data?.location.latitude}
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
                    defaultValue={response?.data?.location.latitude}
                    label="Longitud"
                    type="number"
                    inputRef={register}
                    error={!!formErrors.location?.longitude}
                    helperText={formErrors.location?.longitude?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormSelect
                    defaultValue={response?.data?.riverId}
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
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
    width: "100%",
  },
}));

export default ModuleFormFields;
