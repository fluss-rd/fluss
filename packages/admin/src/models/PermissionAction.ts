export function actionToString(action: PermissionAction): string {
  switch (action) {
    case "read":
      return "Leer";
    case "write":
      return "Escribir";
    case "update":
      return "Actualizar";
    case "delete":
      return "Eliminar";
    default:
      return "Todos";
  }
}

type PermissionAction = typeof actions[number];

export const actions = ["read", "write", "update", "delete", "*"] as const;

export default PermissionAction;

