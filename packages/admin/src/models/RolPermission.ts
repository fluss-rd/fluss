import Action from "./Action";
import Permission from "./Permission";
import Role from "./Role";

export default class RolPermission {
  id: string;
  rol: Role;
  permission: Permission;
  actions: Action[];

  static allActions() {
    return [Action.read, Action.write, Action.update, Action.delete];
  }

  static mockData() {
    const roles = Role.mockData();
    const permissions = Permission.mockData();

    const rolesAndPermissions: RolPermission[] = [
      {
        id: "RP-1",
        permission: permissions[0],
        rol: roles[0],
        actions: [...RolPermission.allActions()],
      },
      {
        id: "RP-2",
        permission: permissions[0],
        rol: roles[1],
        actions: [...RolPermission.allActions()],
      },
      {
        id: "RP-3",
        permission: permissions[1],
        rol: roles[1],
        actions: [...RolPermission.allActions()],
      },
    ];

    return rolesAndPermissions;
  }
}
