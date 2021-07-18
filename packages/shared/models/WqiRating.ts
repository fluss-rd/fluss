export const ratings = [ "excellent", "good water", "poor water", "very poor water", "unsuitable"] as const;

type WqiRating = typeof ratings[number];

export function ratingToColor(category: WqiRating) {
  switch (category) {
    case "excellent":
      return "#219653";
    case "good water":
      return "#2D9CDB";
    case "poor water":
      return "#fcdf03";
    case "very poor water":
      return "#F2994A";
    case "unsuitable":
      return "#EB5757";
    default:
      return "";
  }
}

export function ratingToText(category: WqiRating) {
  switch (category) {
    case "excellent":
      return "Excelente";
    case "good water":
      return "Buena";
    case "poor water":
      return "Mala";
    case "very poor water":
      return "Muy mala";
    case "unsuitable":
      return "Inadecuada";
    default:
      return "";
  }
}

export default WqiRating;
