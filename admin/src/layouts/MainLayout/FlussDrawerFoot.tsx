import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";

interface FlussDrawerProps {
  logout: () => void;
}

export default function FlussDrawerFoot(props: FlussDrawerProps) {
  return (
    <List>
      <ListItem>
        <ListItemText primary="Angélica Peña" />
        <ListItemSecondaryAction>
          <IconButton onClick={props.logout}>
            <PowerSettingsNew />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
