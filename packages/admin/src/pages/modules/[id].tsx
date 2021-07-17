import { NextPage } from "next";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Back from "shared/components/Back";
import TabPanel, { AntTab, AntTabs } from "shared/components/TabPanel";
import { useState, ChangeEvent } from "react";
import General from "fragments/modules/module/General";
import Metrics from "fragments/modules/module/Metrics";
import Logs from "fragments/modules/module/Logs";
import { mockModules } from "shared/models/Module";
import { Typography, Divider } from "@material-ui/core";

const Module: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = useState(0);
  const moduleId = router.query.id;
  const module = mockModules().find((m) => m.id === moduleId);

  const goBack = () => {
    router.back();
  };

  const handleChange = (_: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Back onClick={goBack}>Volver a módulos</Back>

      <br />
      <br />

      <Typography variant="h4">{module?.alias}</Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Perteneciente al {module?.watershedName}
      </Typography>

      <br />

      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
        <AntTab label="General" />
        <AntTab label="Métricas" />
        <AntTab label="Logs" />
      </AntTabs>

      <TabPanel value={value} index={0}>
        <General />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Metrics />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Logs />
      </TabPanel>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({}));
export default Module;

