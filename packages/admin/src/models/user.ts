import Role from "./role";
import UserStatus from "./user-status";

type User = {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  status: UserStatus;
  roleName: string;
  lastUpdate: Date;
  creationDate: Date;
};

export default User;

export function mockUsers(): User[] {
  const roles = Role.mockData();

  return [
    {
      id: "US-1",
      name: "Mikhael",
      surname: "Santos",
      roleName: roles[0].name,
      phoneNumber: "8098045201",
      email: "Mikhael1729@gmail.com",
      status: "active",
      creationDate: new Date(Date.now()),
      lastUpdate: new Date(Date.now()),
    },
    {
      id: "US-2",
      name: "Denys",
      surname: "Rosario",
      phoneNumber: "8295650234",
      roleName: roles[1].name,
      email: "denys@gmail.com",
      status: "inactive",
      creationDate: new Date(Date.now()),
      lastUpdate: new Date(Date.now()),
    },
  ];
}
