import { NextPage } from "next";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mockWatersheds } from "models/watershed";
import WatershedCard from "fragments/watersheds/WatershedCard";

interface HydricResourcesProps {
  quantity: number;
}

const Watersheds: NextPage<HydricResourcesProps> = ({ quantity }) => {
  const classes = useStyles();
  const watersheds = mockWatersheds();

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
            lastUpdate={watershed.updateDate}
            modulesQuantity={watershed.modulesQuantity}
          />
        ))}
      </div>
    </div>
  );
};

Watersheds.getInitialProps = async ({ req }) => {
  return { quantity: 5 };
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

