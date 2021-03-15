import { Button, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ExpandMore, PowerSettingsNew } from "@material-ui/icons";

export default function FlussDrawerFoot() {
  const classes = useStyles();

  return (
    <Button
      variant="text"
      className={classes.button}
      startIcon={<ExpandMore />}
      endIcon={<PowerSettingsNew />}
    >
      <Typography className={classes.name}>Angélica Peña</Typography>
    </Button>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    justifyContent: "flex-start",
    padding: theme.spacing(2),
    textTransform: "none",
    textAlign: "left",
  },
  name: {
    flexGrow: 1,
  },
}));
