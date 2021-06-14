import Wqi from "models/wqi";
import { green, red, orange } from "@material-ui/core/colors";

export default function getWqiColor(wqi: Wqi): string {
  const value = wqi.value;

  if (value >= 80) return green[300];
  else if (value >= 40) return orange[300];
  else return red[300];
}

