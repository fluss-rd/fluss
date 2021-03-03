import { Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";

interface HolaProps {
  size: "medium" | "large";
}

const Hola: FC<HolaProps> = (props) => {
  const classes = useStyles(props);

  return (
    <Button variant="outlined" color="primary" className={classes.hola}>
      Hola
    </Button>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hola: {
      marginLeft: theme.spacing(2),
      fontSize: ({ size }: HolaProps) => (size === "medium" ? 38 : 40),
    },
  })
);

export default Hola;
