import { MenuItem } from "@material-ui/core";
import { InfoOutlined, Grain, FiberManualRecord } from "@material-ui/icons";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import ReactInputMask from "react-input-mask";
import FormSelect from "shared/components/FormSelect";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { mockWatersheds } from "models/watershed";
import { moduleStates, moduleStateToString } from "models/module-state";

interface ModuleFromProps {}

const ModuleFrom: FC<ModuleFromProps> = (props) => {
  const classes = useStyles();
  const watersheds = mockWatersheds();
  const states = moduleStates.map((s) => moduleStateToString(s));

  return (
    <>
      <FormIconTitle Icon={InfoOutlined} title="Datos" />
      <FormField name="alias" label="Alias" placeholder="Ej: Guayubín" />
      <ReactInputMask mask="(999) 999-9999" maskChar=" ">
        {() => {
          console.log("hey");
          return <FormField label="Numéro celular" placeholder="(809) 343-3422" />;
        }}
      </ReactInputMask>

      <FormField name="serial" label="Serial" placeholder="" />

      <FormIconTitle Icon={Grain} title="Elegir cuerpo hídrico" />
      <FormSelect noneText="Sin seleccionar" label="Cuerpo hídrico">
        {watersheds.map(({ id, name }) => (
          <MenuItem key={id} value={name}>
            {name}
          </MenuItem>
        ))}
      </FormSelect>

      <FormIconTitle Icon={FiberManualRecord} title="Elegir estado" />
      <FormSelect noneText="Sin seleccionar" label="Estado">
        {states.map((state) => (
          <MenuItem key={state} value={state}>
            {state}
          </MenuItem>
        ))}
      </FormSelect>
      {/*TODO: Establecer conexión con el módulo para obtener ubicación y confirmar número de teléfono*/}
    </>
  );
};

const useStyles = makeStyles({});

export default ModuleFrom;

