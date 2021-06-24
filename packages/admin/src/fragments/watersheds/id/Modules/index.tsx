import { Typography } from "@material-ui/core";
import formatPhoneNumber from "helpers/format-phone-nomber";
import Module, { mockModules } from "models/module";
import { moduleStateToString } from "models/module-state";
import { ratingToString } from "models/wqi-rating";
import React, { FC, useState } from "react";
import { DataTableColumn, EnhancedDataTable } from "shared/components/Tables";
import formatDate from "shared/helpers/formatDate";

import Actions from "./Actions";
import AddModule from "./AddModule";
import EditModule from "./EditModule";
import ModuleData from "./ModuleData";

interface ModulesProps {
  watershedId: string;
}

const Modules: FC<ModulesProps> = (props) => {
  const [moduleId, setModuleId] = useState<string>("");
  const [moduleIdForData, setModuleIdForData] = useState<string>("");
  const modules = mockModules();
  const columns = generateColumns(onEdit, onViewData);

  function closeEdit() {
    setModuleId("");
  }

  function onEdit(moduleId: string) {
    setModuleId(moduleId);
  }

  function onViewData(moduleId: string) {
    setModuleIdForData(moduleId);
  }

  function closeModuleData() {
    setModuleIdForData("");
  }

  return (
    <div>
      <Typography variant="h4">Módulos</Typography>
      <Typography variant="subtitle1">{modules.length} en total</Typography>

      <br />

      <EnhancedDataTable labeledButtons data={modules} columns={columns} />
      <AddModule watershedId={props.watershedId} />
      <EditModule moduleId={moduleId} isOpen={!!moduleId} onClose={closeEdit} />
      <ModuleData moduleId={moduleIdForData} isOpen={!!moduleIdForData} close={closeModuleData} />
    </div>
  );
};

function generateColumns(
  onEdit: (moduleId: string) => void,
  onViewData: (moduleId: string) => void
): DataTableColumn<Module>[] {
  const columns: DataTableColumn<Module>[] = [
    { Header: "ID", accessor: "id" },
    { Header: "Alias", accessor: "alias" },
    {
      Header: "Teléfono",
      id: "phoneNumber",
      accessor: (m) => formatPhoneNumber(m.phoneNumber),
    },
    { Header: "Estado", id: "state", accessor: (m) => moduleStateToString(m.state) },
    { Header: "WQI", accessor: ({ wqi }) => `${ratingToString(wqi.rating)} (${wqi.value})` },
    { Header: "Calificación", accessor: (m) => ratingToString(m.wqi.rating) },
    { Header: "Última actualización", id: "updateDate", accessor: (m) => formatDate(m.updateDate) },
    {
      Header: "Fecha de registro",
      id: "creationDate",
      accessor: (m) => formatDate(m.creationDate),
    },
    {
      Header: "Acciones",
      accessor: (m) => <Actions moduleId={m.id} onEdit={onEdit} onViewData={onViewData} />,
    },
  ];

  return columns;
}

export default Modules;
