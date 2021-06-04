import { NextPage } from "next";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mockWatersheds } from "models/watershed";
import WatershedCard from "fragments/watersheds/WatershedCard";
import Watershed from "models/watershed";

interface HydricResourcesProps {
  quantity: number;
  watersheds: Watershed[];
}

const Watersheds: NextPage<HydricResourcesProps> = ({ quantity, watersheds }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4">Cuerpos hídricos</Typography>
      <Typography variant="subtitle1" color="textSecondary" className={classes.subtitle}>
        {quantity} en total
      </Typography>

      <br />
      <div className={classes.watershedCards}>
        {watersheds.map((watershed) => (
          <WatershedCard
            key={watershed.id}
            id={watershed.id}
            name={watershed.name}
            wqiValue={watershed.wqi.value}
            lastUpdate={new Date(watershed.updateDate)}
            modulesQuantity={watershed.modulesQuantity}
          />
        ))}
      </div>
    </div>
  );
};

Watersheds.getInitialProps = async ({ req }) => {
  const watersheds = mockWatersheds();

  return { quantity: watersheds.length, watersheds };
};

const useStyles = makeStyles((theme) => ({
  subtitle: {
    paddingLeft: theme.spacing(0.5),
  },
  watershedCards: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default Watersheds;

