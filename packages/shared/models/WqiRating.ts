export const ratings = [ "excellent" , "good" , "moderate" , "bad" , "veryBad"] as const;

type WqiRating = typeof ratings[number];

export function ratingToColor(category: WqiRating) {
  switch (category) {
    case "excellent":
      return "#219653";
    case "good":
      return "#27AE60";
    case "moderate":
      return "#2D9CDB";
    case "bad":
      return "#F2994A";
    case "veryBad":
      return "#EB5757";
    default:
      return "";
  }
}

export function ratingToText(category: WqiRating) {
  switch (category) {
    case "excellent":
      return "Excelente";
    case "good":
      return "Buena";
    case "moderate":
      return "Moderada";
    case "bad":
      return "Mala";
    case "veryBad":
      return "Muy mala";
    default:
      return "";
  }
}

export default WqiRating;
