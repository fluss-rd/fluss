import Rol from "./Rol";

export default class Permission {
  id: string;
  name: string;
  description: string;
  roles: Rol[];

  static mockData(): Permission[] {
    const permissions: Array<Permission> = [
      {
        id: "p1",
        name: "Módulos",
        description: "Permite el acceso al manejo de módulos del sistema",
        roles: [],
      },
      {
        id: "p2",
        name: "Usuarios",
        description:
          "Permite manejar los usuarios dentro de la aplicación. Solo existe un superadmin",
        roles: [],
      },
    ];
    return permissions;
  }
}
