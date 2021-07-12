import { Tooltip } from "@material-ui/core";
import Permission, { mockPermissions } from "models/Permission";
import DataTable, { DataTableColumn } from "shared/components/DataTable";

import EditPermission from "./EditPermission";

export default function Permissions() {
  const permissions = mockPermissions();
  const columns = generateColumns();

  return <DataTable showGlobalFilter data={permissions} columns={columns} />;
}

function generateColumns(): DataTableColumn<Permission>[] {
  const columns: DataTableColumn<Permission>[] = [
    { Header: "Recurso", accessor: "name" },
    { Header: "Descripción", accessor: "description" },
    {
      Header: " ",
      id: "info",
      columnWidth: "100px",
      accessor: (p) => (
        <Tooltip title="Ver detalles">
          <EditPermission permission={p} />
        </Tooltip>
      ),
    },
  ];

  return columns;
}
