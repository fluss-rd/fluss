type ModuleState = typeof moduleStates[number];

export const moduleStates = ["active", "inactive", "deleted", "broken"] as const;

export function moduleStateToString(state: ModuleState) {
  switch (state) {
    case "active":
      return "Activo";
    case "inactive":
      return "Inactivo";
    case "deleted":
      return "Eliminado";
    case "broken":
      return "Roto";
    default:
      return "";
  }
}

export default ModuleState;
