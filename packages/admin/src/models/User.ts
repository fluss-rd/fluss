import { mockRoles } from "./Role";
import UserStatus from "./UserStatus";

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

export function mockUsers(): User[] {
  const roles = mockRoles();

  return [
    {
      id: "US-1",
      name: "Mikhael",
      surname: "Santos",
      roleName: roles[0].name,
      phoneNumber: "8098045201",
      email: "Mikhael1729@gmail.com",
      status: "active",
      creationDate: new Date(2021, 6, 11),
      lastUpdate: new Date(2021, 6, 11),
    },
    {
      id: "US-2",
      name: "Denys",
      surname: "Rosario",
      phoneNumber: "8295650234",
      roleName: roles[1].name,
      email: "denys@gmail.com",
      status: "inactive",
      creationDate: new Date(2021, 6, 11),
      lastUpdate: new Date(2021, 6, 11),
    },
  ];
}

export default User;
