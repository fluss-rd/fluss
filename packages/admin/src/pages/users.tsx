import { Typography } from "@material-ui/core";
import CreateUser from "fragments/users/CreateUser";
import { NextPage } from "next";
import { DataTableColumn, EnhancedDataTable, SelectColumnFilter } from "shared/components/Tables";
import { formatDate } from "shared/helpers";
import User, { mockUsers } from "models/user2";
import formatPhoneNumber from "helpers/formatPhoneNumber";

const Users: NextPage = () => {
  const users = mockUsers();
  const columns = generateColumns();

  return (
    <div>
      <Typography variant="h4">Usuarios</Typography>
      <br />
      <EnhancedDataTable withFilters labeledButtons data={users} columns={columns} />

      <CreateUser />
    </div>
  );
};

function generateColumns() {
  const columns: DataTableColumn<User>[] = [
    { Header: "Nombre", accessor: "name" },
    { Header: "Apellido", accessor: "surname" },
    { Header: "Email", accessor: "email" },
    {
      Header: "Celular",
      id: "phoneNumber",
      accessor: (u) => formatPhoneNumber(u.phoneNumber),
    },
    {
      Header: "Rol",
      id: "roleName",
      accessor: (u) => u.roleName,
      filter: "includes",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Última actualización",
      id: "lastUpdate",
      accessor: (u) => formatDate(u.lastUpdate),
    },
    {
      Header: "Fecha de registro",
      id: "creationDate",
      accessor: (u) => formatDate(u.creationDate),
    },
  ];

  return columns;
}

export default Users;

