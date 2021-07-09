import { green, orange, red } from "@material-ui/core/colors";
import Wqi from "shared/models/Wqi";

export default function getWqiColor(wqi: Wqi): string {
  const value = wqi.value;

  if (value >= 80) return green[300];
  else if (value >= 40) return orange[300];
  else return red[300];
}
