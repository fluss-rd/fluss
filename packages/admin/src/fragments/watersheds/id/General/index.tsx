import { Card, Typography, Grid, Avatar } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { LocationOn } from "@material-ui/icons";
import Map from "components/Map";
import { mockModules } from "models/module";
import { mockWatersheds } from "models/watershed";
import React, { FC } from "react";
import getWqiColor from "helpers/get-wqi-color";
import { grey } from "@material-ui/core/colors";

import WatershedDetailCard from "./WatershedDetailCard";

interface GeneralProps {
  watershedId: string;
}

const General: FC<GeneralProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
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
            const wqiColor = getWqiColor(info.value.wqi);
            return (
              <div className={classes.mark}>
                <div>
                  <Card className={classes.avatar}>
                    <Avatar
                      style={{
                        color: grey[50],
                        background: wqiColor,
                      }}
                    >
                      <LocationOn />
                    </Avatar>
                  </Card>
                </div>
                <Card className={classes.wqi} style={{ background: wqiColor }}>
                  <Typography variant="h5">
                    <span>{info.value.wqi.value}</span>
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
  mark: {
    display: "flex",
    alingItems: "center",
    "&:first-child": {
      display: "flex",
      alignItems: "center",
    },
    "& $avatar": {
      display: "flex",
      alignItems: "center",
      borderRadius: "50%",
      marginRight: theme.spacing(2),
    },
    "& $wqi": {
      color: grey[50],
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(1),
      "& > *:not(:last-child)": {
        marginRight: theme.spacing(1),
      },
    },
  },
  avatar: {},
  wqi: {},
}));

export default General;

