import Permission from "models/Permission";
import { DataTableColumn, EnhancedDataTable } from "shared/components/Tables";

import EditPermission from "./EditPermission";

export default function Permissions() {
  const permissions = Permission.mockData();
  const columns = generateColumns();

  return <EnhancedDataTable data={permissions} columns={columns} />;
}

function generateColumns(): DataTableColumn<Permission>[] {
  const columns: DataTableColumn<Permission>[] = [
    { Header: "Recurso", accessor: "name" },
    { Header: "Descripción", accessor: "description" },
    {
      Header: " ",
      id: "info",
      columnWidth: "100px",
      accessor: (p) => <EditPermission permission={p} />,
    },
  ];

  return columns;
}

