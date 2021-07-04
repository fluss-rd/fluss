import PermissionAction from "./permission-action";

type Permission = {
  id: string;
  name: string;
  description: string;
  actions: PermissionAction[];
  creationDate: Date;
  updatedAt: Date;
};

export default Permission;

export function mockPermissions(): Permission[] {
  const permissions: Array<Permission> = [
    {
      id: "p1",
      name: "Módulos",
      description: "Permite el acceso al manejo de módulos del sistema",
      actions: ["*"],
      creationDate: new Date(2021, 6, 11),
      updatedAt: new Date(2021, 6, 11),
    },
    {
      id: "p2",
      name: "Usuarios",
      actions: ["*"],
      description:
        "Permite manejar los usuarios dentro de la aplicación. Solo existe un superadmin",
      creationDate: new Date(2021, 6, 11),
      updatedAt: new Date(2021, 6, 11),
    },
  ];
  return permissions;
}
