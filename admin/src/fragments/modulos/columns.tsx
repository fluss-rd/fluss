import { DataTableColumn, SelectColumnFilter } from "components/Tables";
import formatDate from "helpers/formatDate";
import Module from "models/Module";

import InfoIconButton from "./InfoIconButton";

const columns: DataTableColumn<Module>[] = [
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
  { id: "createdAt", Header: "Fecha de registro", accessor: (data) => formatDate(data.createdAt) },
  {
    id: "info",
    Header: "Detalle",
    accessor: (data: Module, i: number) => <InfoIconButton index={i} />,
  },
];

export default columns;
