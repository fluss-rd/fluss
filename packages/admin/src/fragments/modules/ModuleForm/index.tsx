import { Grid, MenuItem, Typography } from "@material-ui/core";
import { EditLocationOutlined, InfoOutlined } from "@material-ui/icons";
import Module from "models/Module";
import River from "models/River";
import React, { FC } from "react";
import { Controller } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import FormSelect from "shared/components/FormSelect";

import { ModuleLocationProps } from "../ModuleLocation";
import ModuleLocation from "../ModuleLocation";
import { UseModuleForm } from "./useModuleForm";

interface ModuleFormProps {
  moduleForm: UseModuleForm;
  module?: Module;
  ModuleLocationProps?: Partial<ModuleLocationProps>;
}

const ModuleForm: FC<ModuleFormProps> = (props) => {
  const { form, onRiverIdChange, changeLocation, riversQuery } = props.moduleForm;
  const { control, errors, register } = form;
  //const rivers = riversQuery.data?.data || [];
  const rivers = River.mockData();
  const module = props.module;

  return (
    <>
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
              {/* Avoid the warning that appears when the provided defaultValue doesn't exists*/}
              {rivers.length && (
                <Grid item xs={12}>
                  <FormSelect
                    key={module?.id || ""}
                    noneText="Ninguno"
                    label="Cuerpo hídrico"
                    error={!!errors.riverId}
                    helperText={errors.riverId?.message}
                    onChange={onRiverIdChange}
                    defaultValue={module?.riverName || ""}
                  >
                    {rivers.map((river: River) => (
                      <MenuItem key={river.id} value={river.name}>
                        {river.name}
                      </MenuItem>
                    ))}
                  </FormSelect>
                </Grid>
              )}
              <Grid item xs={12}>
                <FormField
                  name="location.latitude"
                  label="Latitud"
                  type="number"
                  inputRef={register}
                  error={!!errors.location?.latitude}
                  helperText={errors.location?.latitude?.message}
                />
              </Grid>
              <Grid item xs={12}>
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
              <ModuleLocation onNewMarker={changeLocation} {...props.ModuleLocationProps} />
              <br />
              <Typography style={{ fontWeight: "bold" }} color="textSecondary">
                Ubicación
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

ModuleForm.defaultProps = {};

export default ModuleForm;
