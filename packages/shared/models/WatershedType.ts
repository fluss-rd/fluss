export const watershedTypes = ["river", "lagoon", "lake", "stream"] as const;

type WatershedType = typeof watershedTypes[number];

export function watershedTypeToString(watershedType: WatershedType) {
  switch (watershedType) {
    case "stream":
      return "Arroyo";
    case "lake":
      return "Lago";
    case "lagoon":
      return "Laguna";
    case "river":
      return "Río";
    default:
      return "";
  }
}

export default WatershedType;

