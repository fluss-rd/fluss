/* eslint-disable react/jsx-key */
import { Typography } from "@material-ui/core";
import { useMemo } from "react";

import DataTableColumn from "../components/DataTable/DataTableColumn";
import EnhancedDataTable from "../components/EnhancedDataTable";
import InfoIconButton from "../fragments/modulos/InfoIconButton";
import formatDate from "../helpers/formatDate";
import Module from "../models/Module";

export default function Modulos() {
  const data = useMemo(() => Module.mockData(), []);
  return (
    <div>
      <Typography variant="h4">Módulos</Typography>

      <br />

      <EnhancedDataTable data={data} columns={columns} />
    </div>
  );
}

const columns: DataTableColumn<Module>[] = [
  { Header: "ID", accessor: "id", width: 200, columnWidth: "10%" },
  { Header: "Número SIM", accessor: "simNumber", columnWidth: "15%" },
  { Header: "Nombre", accessor: "name" },
  { Header: "Descripción", accessor: "description", columnWidth: "30%" },
  {
    Header: "Última actualización",
    columnWidth: "15%",
    accessor: (data) => formatDate(data.updatedAt),
  },
  { Header: "Fecha de registro", accessor: (data) => formatDate(data.createdAt) },
  {
    Header: " ",
    accessor: (data: Module, i: number) => <InfoIconButton index={i} />,
  },
];
