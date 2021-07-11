type ParameterName = typeof parameters[number];

export function toString(parameterName: ParameterName) {
  switch (parameterName) {
    case "oxygen":
      return "Oxígeno";
    case "pH":
      return "pH";
    case "temperature":
      return "Temperatura";
    case "dissolvedSolids":
      return "Sólidos disueltos";
    case "turbidity":
      return "Turbidez";
    default:
      return "";
  }
}

export const parameters = ["oxygen", "pH", "temperature", "dissolvedSolids", "turbidity"] as const;

export default ParameterName;
