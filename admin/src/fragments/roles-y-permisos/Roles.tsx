import { DataTableColumn, EnhancedDataTable } from "components/Tables";
import formatDate from "helpers/formatDate";
import Rol from "models/Rol";

export default function Roles() {
  return <EnhancedDataTable data={Rol.mockData()} columns={columns} />;
}

const columns: DataTableColumn<Rol>[] = [
  { Header: "Nombre", accessor: "name" },
  { Header: "Descripción", accessor: "description" },
  { Header: "Fecha de creación", accessor: (rol) => formatDate(rol.creationDate) },
  { Header: "Última actualización", accessor: (rol) => formatDate(rol.creationDate) },
];
