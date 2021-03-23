import { Fab, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { EnhancedDataTable } from "components/Tables";
import columns from "fragments/modulos/columns";
import OpenFormButton from "fragments/modulos/OpenFormButton";
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
      <OpenFormButton />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100%",
  },
}));
