import Role, { mockRoles } from "models/role";
import { DataTableColumn, EnhancedDataTable } from "shared/components/Tables";
import formatDate from "shared/helpers/formatDate";

import CreateRol from "./CreateRole";
import EditRol from "./EditRole";

export default function Roles() {
  return (
    <>
      <EnhancedDataTable data={mockRoles()} columns={columns} />
      <CreateRol />
    </>
  );
}

const columns: DataTableColumn<Role>[] = [
  { Header: "Nombre", accessor: "name" },
  { Header: "Descripción", accessor: "description" },
  { Header: "Fecha de creación", accessor: (rol) => formatDate(rol.creationDate) },
  { Header: "Última actualización", accessor: (rol) => formatDate(rol.lastUpdate) },
  { Header: " ", columnWidth: "100px", id: "info", accessor: (rol) => <EditRol role={rol} /> },
];

