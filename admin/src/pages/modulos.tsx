import { makeStyles, Typography } from "@material-ui/core";
import { EnhancedDataTable } from "components/Tables";
import { DataTableColumn, SelectColumnFilter } from "components/Tables";
import InfoIconButton from "fragments/modulos/InfoIconButton";
import RegisterModule from "fragments/modulos/RegisterModule";
import ViewModule from "fragments/modulos/ViewModule";
import formatDate from "helpers/formatDate";
import Module from "models/Module";
import { useCallback, useMemo, useState } from "react";

export default function Modulos() {
  const [current, setCurrent] = useState<Module | null>(null);
  const classes = useStyles();
  const data = useMemo(() => Module.mockData(), []);
  const handleModuleClicked = useCallback((index: number) => setCurrent({ ...data[index] }), [
    setCurrent,
  ]);
  const dataColumns = useMemo(() => columns(handleModuleClicked), [handleModuleClicked]);

  console.log(current);

  return (
    <div className={classes.root}>
      <Typography variant="h4">Módulos</Typography>

      <br />

      <EnhancedDataTable data={data} columns={dataColumns} />
      <RegisterModule />
      <ViewModule module={current} close={() => setCurrent(null)} />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    position: "relative",
    height: "100%",
  },
});

const columns = (handleModuleClicked: (index: number) => void): DataTableColumn<Module>[] => [
  { Header: "ID", accessor: "id", width: 200, columnWidth: "10%" },
  {
    Header: "Número SIM",
    accessor: "simNumber",
    columnWidth: "15%",
    filter: "includes",
    Filter: SelectColumnFilter,
  },
  { Header: "Nombre", accessor: "name" },
  { Header: "Descripción", accessor: "description", columnWidth: "30%" },
  {
    id: "updatedAt",
    Header: "Última actualización",
    columnWidth: "15%",
    accessor: (data) => formatDate(data.updatedAt),
  },
  {
    id: "createdAt",
    Header: "Fecha de registro",
    accessor: (data) => formatDate(data.createdAt),
  },
  {
    id: "info",
    Header: "Detalle",
    accessor: (data: Module, i: number) => (
      <InfoIconButton index={i} handleClick={handleModuleClicked} />
    ),
  },
];
