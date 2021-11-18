import { Avatar, Card, CardActionArea } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { LocationOn } from "@material-ui/icons";
import React, { FC, MouseEvent, useState } from "react";
import Wqi from "shared/models/Wqi";

import { ratingToColor } from "../../../models/WqiRating";
import ModuleMarkerPreview from "./ModuleMarkerPreview";

interface ModuleMarkerProps {
  moduleId: string;
  name: string;
  wqi: Wqi;
  onModuleData?: (moduleId: string) => void;
}

const ModuleMarker: FC<ModuleMarkerProps> = ({ name, wqi, moduleId, ...props }) => {
  const classes = useStyles();
  const wqiColor = ratingToColor(wqi.rating);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openActions = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeActions = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CardActionArea onMouseOver={openActions}>
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
        </div>
      </CardActionArea>
      <ModuleMarkerPreview
        onClose={closeActions}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        moduleId={moduleId}
        onModuleData={props.onModuleData}
      />
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
