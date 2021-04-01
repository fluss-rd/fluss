import Permission from "./Permission";

export default class Rol {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];

  static mockData(): Rol[] {
    const roles: Array<Rol> = [
      {
        id: "r1",
        name: "Administrador",
        description: "",
        permissions: [],
      },
      {
        id: "r2",
        name: "Monitor",
        description: "",
        permissions: [],
      },
    ];

    return roles;
  }
}
