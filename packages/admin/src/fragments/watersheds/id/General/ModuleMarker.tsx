import { Card, Typography, Avatar, Popover, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LocationOn } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import React, { FC, MouseEvent, useState } from "react";
import getWqiColor from "helpers/get-wqi-color";
import Wqi from "models/wqi";
import ModuleMarkerPreview from "./ModuleMarkerPreview";

interface ModuleMarkerProps {
  moduleId: string;
  name: string;
  wqi: Wqi;
}

const ModuleMarker: FC<ModuleMarkerProps> = ({ name, wqi, moduleId }) => {
  const classes = useStyles();
  const wqiColor = getWqiColor(wqi);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openActions = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeActions = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CardActionArea onClick={openActions}>
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
      </CardActionArea>
      <ModuleMarkerPreview onClose={closeActions} anchorEl={anchorEl} moduleId={moduleId} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  mark: {
    cursor: "pointer",
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

