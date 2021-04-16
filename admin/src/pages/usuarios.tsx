import { Typography } from "@material-ui/core";
import User from "models/User";
import { NextPage } from "next";
import { DataTableColumn, EnhancedDataTable, SelectColumnFilter } from "shared/components/Tables";
import { formatDate } from "shared/helpers";

const Users: NextPage = () => {
  const data = User.mockData();
  const columns = generateColumns();

  return (
    <div>
      <Typography variant="h4">Usuarios</Typography>
      <br />
      <EnhancedDataTable withFilters labeledButtons data={data} columns={columns} />
    </div>
  );
};

function generateColumns() {
  const columns: DataTableColumn<User>[] = [
    { Header: "Nombre", accessor: "name" },
    { Header: "Apellido", accessor: "surname" },
    { Header: "Última actualización", id: "lastUpdate", accessor: (u) => formatDate(u.lastUpdate) },
    {
      Header: "Fecha de creación",
      id: "creationDate",
      accessor: (u) => formatDate(u.creationDate),
    },
    {
      Header: "Rol",
      id: "rol",
      accessor: (u) => u.rol.name,
      filter: "includes",
      Filter: SelectColumnFilter,
    },
  ];

  return columns;
}

export default Users;
