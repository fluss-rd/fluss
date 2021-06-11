import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LocationOn } from "@material-ui/icons";
import Map from "components/Map";
import { mockModules } from "models/module";
import { mockWatersheds } from "models/watershed";
import { wqiToColor } from "models/wqi";
import React, { FC } from "react";

import WatershedDetailCard from "./WatershedDetailCard";

interface GeneralProps {
  watershedId: string;
}

const General: FC<GeneralProps> = (props) => {
  const classes = useStyles();
  const watershed = mockWatersheds().find((w) => w.id === props.watershedId);
  const modules = mockModules().filter((m) => m.watershedId === props.watershedId);
  const locations = modules.map((m) => ({ value: { name: m.alias, wqi: m.wqi }, ...m.location }));

  return (
    <div className={classes.container}>
      <div className={classes.map}>
        <Map
          locations={locations}
          zoom={10}
          render={(info) => {
            const wqiColor = wqiToColor(info.value.wqi);
            return (
              <div className={classes.location}>
                <LocationOn color="primary" style={{ color: wqiColor }} />
                <Card className={classes.card}>
                  <Typography variant="body1" style={{ color: wqiColor }}>
                    WQI <span>{info.value.wqi.value}</span>
                  </Typography>
                  <Typography variant="body2">{info.value.name}</Typography>
                </Card>
              </div>
            );
          }}
        />
      </div>
      <div className={classes.riverDetail}>
        <WatershedDetailCard watershed={watershed} />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  riverDetail: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    width: 500,
    top: theme.spacing(4),
    left: theme.spacing(4),
  },
  location: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlignt: "center",
    cursor: "pointer",
    "& $card": {
      padding: theme.spacing(1),
    },
  },
  card: {},
}));

export default General;
