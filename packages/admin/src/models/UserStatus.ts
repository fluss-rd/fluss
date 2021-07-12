type UserStatus = typeof userStatusList[number];

export const userStatusList = ["active", "inactive"] as const;

export function userStatusToString(status: UserStatus): string {
  switch (status) {
    case "active":
      return "Activo";
    case "inactive":
      return "Inactivo";
    default:
      return "";
  }
}

export default UserStatus;
