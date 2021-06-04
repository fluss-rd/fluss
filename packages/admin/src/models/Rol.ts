import Permission from "./Permission";
import { Role as RoleForm, Permission as PermissionForm } from "services/auth/models";

export default class Rol {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  creationDate: Date;
  lastUpdate: Date;

  static mockData(): Rol[] {
    const roles: Array<Rol> = [
      {
        id: "r1",
        name: "Administrador",
        description: "Tiene acceso a todos los módulos del sistema",
        permissions: [],
        creationDate: new Date(Date.now()),
        lastUpdate: new Date(Date.now()),
      },
      {
        id: "r2",
        name: "Monitor",
        description: "Encargado del manejo de los módulos",
        permissions: [],
        creationDate: new Date(Date.now()),
        lastUpdate: new Date(Date.now()),
      },
    ];

    return roles;
  }

  static toRoleForm(role: Rol): RoleForm {
    return {
      permissions: role.permissions.map(
        (p) => ({ actions: [...p.actions], resource: p.name } as PermissionForm)
      ),
      name: role.name,
      description: role.description,
    };
  }
}

