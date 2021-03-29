import Rol from "./Rol";

// Read, Write, Delete.
export type Actions = [boolean, boolean, boolean];

export default class Permission {
  id: string;
  resourceName: string;
  actions: Actions;
  roles: Rol[];

  constructor(permission: Permission) {
    Object.assign(this, permission);
  }

  static actionName(index: number) {
    switch (index) {
      case 0:
        return "Leer";
      case 1:
        return "Escribir";
      case 2:
        return "Eliminar";
      default:
        return "";
    }
  }

  static mockData(): Permission[] {
    return [
      {
        id: "p1",
        resourceName: "Módulos",
        roles: [],
        actions: [true, true, true],
      },
      {
        id: "p2",
        resourceName: "Usuarios",
        roles: [],
        actions: [true, true, true],
      },
    ];
  }
}
