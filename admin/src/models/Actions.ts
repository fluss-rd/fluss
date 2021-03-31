import Permission from "./Permission";
import Rol from "./Rol";

export type ActionType = "read" | "write" | "delete";

export default class Actions {
  id: string;
  read: boolean;
  write: boolean;
  delete: boolean;
  permission: Permission;
  rol: Rol;

  static actionTypeToText(type: ActionType): string {
    switch (type) {
      case "read":
        return "Leer";
      case "write":
        return "Escribir";
      case "delete":
        return "Eliminar";
      default:
        return "";
    }
  }

  static mockData() {
    const permissions = Permission.mockData();
    const roles = Rol.mockData();

    const actions: Array<Actions> = [
      {
        id: "a1",
        read: true,
        write: true,
        delete: true,
        permission: permissions[0],
        rol: roles[0],
      },
      {
        id: "a2",
        read: true,
        write: true,
        delete: true,
        permission: permissions[0],
        rol: roles[1],
      },
      {
        id: "a3",
        read: true,
        write: true,
        delete: true,
        permission: permissions[1],
        rol: roles[1],
      },
    ];

    return actions;
  }
}
