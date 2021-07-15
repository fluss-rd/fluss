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

export function moduleStateToColor(state: ModuleState) {
  switch (state) {
    case "active":
      return "#31B76E";
    case "inactive":
      return "#878787";
    case "deleted":
      return "#FE0909";
    case "broken":
      return "#FE7109";
    default:
      return "";
  }
}

export default ModuleState;

