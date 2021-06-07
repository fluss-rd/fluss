import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import FormField from "shared/components/FormField";
import formatDate from "shared/helpers/formatDate";

export interface RegistrationAndUpdateDatesProps {
  registration: Date;
  lastUpdate: Date;
}

const RegistrationAndUpdateDates: FC<RegistrationAndUpdateDatesProps> = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <FormField
          disabled
          variant="standard"
          label="Fecha de registro"
          value={formatDate(props.registration)}
        />
      </Grid>
      <Grid item>
        <FormField
          disabled
          variant="standard"
          label="Última actualización"
          value={formatDate(props.lastUpdate)}
        />
      </Grid>
    </Grid>
  );
};

export default RegistrationAndUpdateDates;
