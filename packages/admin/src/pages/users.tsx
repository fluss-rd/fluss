import { IconButton, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import CreateUser from "fragments/users/CreateUser";
import EditUser from "fragments/users/EditUser";
import User, { mockUsers } from "models/user";
import { userStatusToString } from "models/user-status";
import { NextPage } from "next";
import { useState } from "react";
import { DataTableColumn, EnhancedDataTable, SelectColumnFilter } from "shared/components/Tables";

const Users: NextPage = () => {
  const [userId, setUserId] = useState<string>("");
  const users = mockUsers();
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
    { Header: "Estado", id: "status", accessor: (u) => userStatusToString(u.status) },
    {
      Header: "Rol",
      id: "roleName",
      accessor: (u) => u.roleName,
      filter: "includes",
      Filter: SelectColumnFilter,
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
