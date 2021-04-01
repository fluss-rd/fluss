import { Typography } from "@material-ui/core";
import TabPanel, { AntTab, AntTabs } from "components/TabPanel";
import Permissions from "fragments/roles-y-permisos/Permissions";
import Roles from "fragments/roles-y-permisos/Roles";
import React, { ChangeEvent, useCallback, useState } from "react";

export default function RolesAndPermissions() {
  const [value, setValue] = useState(0);

  const handleChange = useCallback((event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }, []);

  return (
    <>
      <Typography variant="h4">Roles y permisos</Typography>

      <br />

      <Typography variant="body1">
        Maneja los roles y permisos de usuarios que se encuentren registrados en la plataforma
      </Typography>

      <br />

      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
        <AntTab label="Roles" />
        <AntTab label="Permisos" />
      </AntTabs>

      <TabPanel value={value} index={0}>
        <Roles />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Permissions />
      </TabPanel>
    </>
  );
}
