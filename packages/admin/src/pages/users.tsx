import { IconButton, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import CreateUser from "fragments/users/CreateUser";
import EditUser from "fragments/users/EditUser";
import formatPhoneNumber from "helpers/formatPhoneNumber";
import User, { mockUsers } from "models/user2";
import { NextPage } from "next";
import { useState } from "react";
import { DataTableColumn, EnhancedDataTable, SelectColumnFilter } from "shared/components/Tables";
import { formatDate } from "shared/helpers";

const Users: NextPage = () => {
  const users = mockUsers();
  const [userId, setUserId] = useState<string>("");
  const onEdit = (id: string) => () => setUserId(id);
  const close = () => setUserId("");
  const columns = generateColumns(onEdit);

  return (
    <div>
      <Typography variant="h4">Usuarios</Typography>
      <br />
      <EnhancedDataTable withFilters labeledButtons data={users} columns={columns} />

      <CreateUser />
      <EditUser isOpen={!!userId} close={close} id={userId} />
    </div>
  );
};

function generateColumns(onEdit: (userId: string) => () => void) {
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
    {
      Header: "Editar",
      id: "edit",
      accessor: (u) => (
        <IconButton onClick={onEdit(u.id)}>
          <Edit />
        </IconButton>
      ),
    },
  ];

  return columns;
}

export default Users;
