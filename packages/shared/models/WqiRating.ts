export const ratings = ["good", "moderate", "poor"] as const;

type WqiRating = typeof ratings[number];

export function ratingToString(rating: WqiRating) {
  switch (rating) {
    case "good":
      return "Buen estado";
    case "moderate":
      return "Moderado";
    case "poor":
      return "Alta contaminación";
    default:
      return "";
  }
}

export default WqiRating;

