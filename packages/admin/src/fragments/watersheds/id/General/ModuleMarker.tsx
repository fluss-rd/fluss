import { Card, Typography, Avatar } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { LocationOn } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import React, { FC } from "react";
import getWqiColor from "helpers/get-wqi-color";
import Wqi from "models/wqi";

interface ModuleMarkerProps {
  moduleId: string;
  name: string;
  wqi: Wqi;
}

const ModuleMarker: FC<ModuleMarkerProps> = ({ name, wqi }) => {
  const classes = useStyles();
  const theme = useTheme();
  const wqiColor = getWqiColor(wqi);

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
          <span>{wqi.value}</span>
        </Typography>
        <Typography variant="body2">{name}</Typography>
      </Card>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
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

export default ModuleMarker;

