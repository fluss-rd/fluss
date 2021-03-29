import Permission from "./Permission";
import Rol from "./Rol";

type RolePermission = {
  id: string;
  permission: Permission;
  role: Rol;
};

export default RolePermission;

const permissions: Permission[] = Permission.mockData();
const roles: Rol[] = Rol.mockData();

permissions[0].roles.push(roles[0]);
permissions[1].roles = [...roles];

roles[0].permissions = [...permissions];
roles[1].permissions = [permissions[0]];

export const rolesPermissions: [Rol[], Permission[]] = [roles, permissions];
