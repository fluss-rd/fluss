import Permission from "models/Permission";
import { DataTableColumn, EnhancedDataTable } from "shared/components/Tables";
import { formatDate } from "shared/helpers";

import CreatePermission from "./CreatePermission";

export default function Permissions() {
  const permissions = Permission.mockData();
  const columns = generateColumns();

  return (
    <>
      <EnhancedDataTable data={permissions} columns={columns} />
      <CreatePermission />
    </>
  );
}

function generateColumns(): DataTableColumn<Permission>[] {
  const columns: DataTableColumn<Permission>[] = [
    { Header: "Recurso", accessor: "name" },
    { Header: "Descripción", accessor: "description" },
    {
      Header: "Creación",
      id: "creationDate",
      accessor: (p) => formatDate(p.creationDate),
    },
    {
      Header: "Última actualización",
      id: "updatedAt",
      accessor: (p) => formatDate(p.updatedAt),
    },
  ];

  return columns;
}
