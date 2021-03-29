import { DataTableColumn, EnhancedDataTable } from "components/Tables";
import PermissionModel, { Actions } from "models/Permission";
import { rolesPermissions } from "models/RolePermission";

import Permission from "./Permission";

export default function Permissions() {
  const [data, columns] = generateDateAndColumns();

  return <EnhancedDataTable data={data} columns={columns} />;
}

function generateDateAndColumns(): [PermissionModel[], DataTableColumn<PermissionModel>[]] {
  const [roles, permissions] = rolesPermissions;
  const columns: DataTableColumn<PermissionModel>[] = [
    { Header: "Recurso", accessor: "resourceName" },
  ];

  for (const rol of roles)
    columns.push({
      Header: rol.name,
      accessor: (permission: PermissionModel) => {
        const roleHasPermission = permission.roles.indexOf(rol) !== -1;
        const actions = roleHasPermission ? [...permission.actions] : [false, false, false];

        return <Permission actions={actions as Actions} />;
      },
    });

  return [permissions, columns];
}
