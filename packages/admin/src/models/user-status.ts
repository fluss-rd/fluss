export const userStatusList = ["active", "inactive", "removed"] as const;

type UserStatus = typeof userStatusList[number];

export default UserStatus;

export function userStatusToString(status: UserStatus): string {
  switch (status) {
    case "active":
      return "Activo";
    case "inactive":
      return "Inactivo";
    case "removed":
      return "Eliminado";
    default:
      return "";
  }
}
