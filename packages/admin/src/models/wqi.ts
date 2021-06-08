import WqiRating from "./wqi-rating";

type Wqi = { value: number; rating: WqiRating };

export function wqiToColor(wqi: Wqi): string {
  const value = wqi.value;

  if (value >= 80) return "lightgreen";
  else if (value >= 40) return "lightyellow";
  else return "red";
}

export default Wqi;

