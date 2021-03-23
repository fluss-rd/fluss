import { makeStyles, Typography } from "@material-ui/core";
import { EnhancedDataTable } from "components/Tables";
import columns from "fragments/modulos/columns";
import RegisterModule from "fragments/modulos/RegisterModule";
import Module from "models/Module";
import { useMemo } from "react";

export default function Modulos() {
  const data = useMemo(() => Module.mockData(), []);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">Módulos</Typography>

      <br />

      <EnhancedDataTable data={data} columns={columns} />
      <RegisterModule />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    position: "relative",
    height: "100%",
  },
});
