import Rol from "./Rol";

export default class Permission {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  updatedAt: Date;
  roles: Rol[];

  static mockData(): Permission[] {
    const permissions: Array<Permission> = [
      {
        id: "p1",
        name: "Módulos",
        description: "Permite el acceso al manejo de módulos del sistema",
        creationDate: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        roles: [],
      },
      {
        id: "p2",
        name: "Usuarios",
        description:
          "Permite manejar los usuarios dentro de la aplicación. Solo existe un superadmin",
        creationDate: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        roles: [],
      },
    ];
    return permissions;
  }
}
