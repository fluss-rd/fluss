import { makeStyles, Typography } from "@material-ui/core";
import InfoIconButton from "fragments/modulos/InfoIconButton";
import RegisterModule from "fragments/modulos/RegisterModule";
import ViewModule from "fragments/modulos/ViewModule";
import { useGetModules } from "hooks/modules-service";
import Module from "models/Module";
import { useCallback, useMemo, useState } from "react";
import { ModuleData } from "services/modules/models";
import { EnhancedDataTable } from "shared/components/Tables";
import { DataTableColumn, SelectColumnFilter } from "shared/components/Tables";
import formatDate from "shared/helpers/formatDate";
import useMergeState from "shared/hooks/useMergeState";

export default function Modulos() {
  const classes = useStyles();
  const { data: response, isLoading, refetch } = useGetModules();
  const modules = Module.fromModuleDataList(response?.data);
  const [viewState, setViewState] = useMergeState({ isOpen: false, moduleId: "" });
  const selectModule = (id: string) => setViewState({ moduleId: id, isOpen: true });
  const columns = useMemo(() => generateColumns(selectModule), []);

  return (
    <div className={classes.root}>
      <Typography variant="h4">Módulos</Typography>
      <br />
      <EnhancedDataTable withFilters withColumnsSelection data={modules} columns={columns} />
      <RegisterModule />
      <ViewModule
        open={viewState.isOpen}
        moduleId={viewState.moduleId}
        close={() => setViewState({ isOpen: false })}
        onSave={(module: Module) => {
          console.log(module);
        }}
      />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    position: "relative",
    height: "100%",
  },
});

const generateColumns = (handleModuleClicked: (id: string) => void): DataTableColumn<Module>[] => [
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
  { accessor: "river", Header: "Cuerpo hídrico" },
  {
    id: "info",
    Header: "Detalle",
    accessor: (data: Module, i: number) => (
      <InfoIconButton index={data.id} handleClick={handleModuleClicked} />
    ),
  },
];
