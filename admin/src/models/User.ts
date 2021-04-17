import Rol from "./Rol";

export default class User {
  id: string;
  email: string;
  name: string;
  surname: string;
  lastUpdate: Date;
  creationDate: Date;
  rol: Rol;

  static mockData(): User[] {
    const roles = Rol.mockData();

    const users: User[] = [
      {
        id: "US-1",
        email: "persona@gmail.com",
        name: "Persona",
        surname: "Determinada",
        lastUpdate: new Date(Date.now()),
        creationDate: new Date(Date.now()),
        rol: roles[0],
      },
      {
        id: "US-2",
        email: "otra@gmail.com",
        name: "Otra",
        surname: "Persona",
        lastUpdate: new Date(Date.now()),
        creationDate: new Date(Date.now()),
        rol: roles[1],
      },
    ];
    return users;
  }
}
