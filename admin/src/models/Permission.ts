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
        description: "",
        roles: [],
      },
      {
        id: "p2",
        name: "Usuarios",
        description: "",
        roles: [],
      },
    ];
    return permissions;
  }
}
