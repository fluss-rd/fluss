import Role from "./Role";

export default class User {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  rol: Role;
  lastUpdate: Date;
  creationDate: Date;

  static mockData(): User[] {
    const roles = Role.mockData();

    const users: User[] = [
      {
        id: "US-1",
        email: "persona@gmail.com",
        phoneNumber: "8295650292",
        name: "Persona",
        surname: "Determinada",
        lastUpdate: new Date(Date.now()),
        creationDate: new Date(Date.now()),
        rol: roles[0],
      },
      {
        id: "US-2",
        email: "otra@gmail.com",
        phoneNumber: "8092349384",
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
