import Permission from "./Permission";

export default class Rol {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  lastUpdate: Date;
  permissions: Permission[];

  constructor(rol: Rol) {
    Object.assign(this, rol);
  }

  static mockData(): Rol[] {
    return [
      {
        id: "r1",
        name: "Administrador",
        description: "Tiene acceso a la parte de manejo de módulos y reportes del sistema",
        creationDate: new Date(Date.now()),
        lastUpdate: new Date(Date.now()),
        permissions: [],
      },
      {
        id: "r1",
        name: "Cliente",
        description: "Tiene acceso a la parte de manejo de módulos y reportes del sistema",
        creationDate: new Date(Date.now()),
        lastUpdate: new Date(Date.now()),
        permissions: [],
      },
    ];
  }
}
