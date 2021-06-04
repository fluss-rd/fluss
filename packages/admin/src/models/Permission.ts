import PermissionAction from "./PermissionAction";

export default class Permission {
  id: string;
  name: string;
  description: string;
  actions: PermissionAction[];
  creationDate: Date;
  updatedAt: Date;

  static mockData(): Permission[] {
    const permissions: Array<Permission> = [
      {
        id: "p1",
        name: "Módulos",
        description: "Permite el acceso al manejo de módulos del sistema",
        actions: ["*"],
        creationDate: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        id: "p2",
        name: "Usuarios",
        actions: ["*"],
        description:
          "Permite manejar los usuarios dentro de la aplicación. Solo existe un superadmin",
        creationDate: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ];
    return permissions;
  }
}
