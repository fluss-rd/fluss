import { makeStyles, Typography } from "@material-ui/core";
import InfoIconButton from "fragments/modulos/InfoIconButton";
import RegisterModule from "fragments/modulos/RegisterModule";
import ViewModule from "fragments/modulos/ViewModule";
import { useGetModules } from "hooks/modules-service";
import Module from "models/Module";
import { useMemo } from "react";
import { EnhancedDataTable } from "shared/components/Tables";
import { DataTableColumn, SelectColumnFilter } from "shared/components/Tables";
import formatDate from "shared/helpers/formatDate";
import useMergeState from "shared/hooks/useMergeState";

export default function Modulos() {
  const classes = useStyles();
  const [state, setState] = useMergeState({ open: false, moduleId: "" });
  const { data: response } = useGetModules();
  const closeViewModule = () => setState({ open: false, moduleId: "" });
  const openViewModule = (moduleId: string) => setState({ open: true, moduleId });
  const modules =
    response?.data !== undefined ? Module.fromModuleDataList(response?.data) : undefined;
  const columns = useMemo(() => generateColumns(openViewModule), []);

  return (
    <div className={classes.root}>
      <Typography variant="h4">Módulos</Typography>
      <br />
      <EnhancedDataTable withFilters withColumnsSelection data={modules} columns={columns} />
      <RegisterModule />
      <ViewModule moduleId={state.moduleId} open={state.open} close={closeViewModule} />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    position: "relative",
    height: "100%",
  },
});

const generateColumns = (onModuleInfo: (id: string) => void): DataTableColumn<Module>[] => [
  {
    Header: "ID",
    id: "id",
    accessor: (m) => (
      <Typography style={{ wordWrap: "break-word" }} variant="body2">
        {m.id}
      </Typography>
    ),
  },
  {
    Header: "Número celular",
    accessor: "simNumber",
    filter: "includes",
    Filter: SelectColumnFilter,
  },
  {
    id: "updatedAt",
    Header: "Última actualización",
    accessor: (data) => formatDate(data.updatedAt, { type: "dateAndTime" }),
  },
  {
    id: "createdAt",
    Header: "Fecha de registro",
    accessor: (data) => formatDate(data.createdAt),
  },
  { accessor: "riverName", Header: "Cuerpo hídrico" },
  {
    id: "info",
    Header: "Detalle",
    accessor: (data: Module, i: number) => (
      <InfoIconButton moduleId={data.id} onModuleInfo={onModuleInfo} />
    ),
  },
];
