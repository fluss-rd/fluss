import { Add } from "@material-ui/icons";
import Hey from "components/Hey";
import PopoverIcon from "components/PopoverIcon";

export default function Home() {
  return (
    <div>
      <h1>Papp</h1>
      <Hey onClick={() => console.log("hey")} />
      <PopoverIcon icon={Add} title="hey" />
    </div>
  );
}

