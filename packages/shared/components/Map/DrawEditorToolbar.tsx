import { lighten, useTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Button, ButtonGroup, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CropFreeIcon from "@material-ui/icons/CropFree";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React, { FC, useState, useEffect } from "react";

export type ToolbarMode = "edition" | "view";

interface DrawEditorToolbarProps {
  mode?: ToolbarMode;
  onDrawMode: (newMode: ToolbarMode) => void;
  onDelete: () => void;
}

function modeToBoolean(mode: ToolbarMode) {
  if (mode === "view") return true;

  return false;
}

const DrawEditorToolbar: FC<DrawEditorToolbarProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const booleanMode = props.mode === "view" ? true : false;
  const [onViewMode, setOnViewMode] = useState(booleanMode);

  useEffect(() => {
    setOnViewMode(booleanMode);
  }, [props.mode]);

  const onChangeViewMode = () => {
    const nextMode = !onViewMode;

    if (props.onDrawMode) {
      const mode = nextMode === true ? "view" : "edition";
      props.onDrawMode(mode);
    }

    setOnViewMode(nextMode);
  };

  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical outlined primary button group"
        className={classes.button}
      >
        <Tooltip title="Habilitar selección">
          <Button onClick={onChangeViewMode} style={{ background: !onViewMode && grey[50] }}>
            <CropFreeIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Eliminar selección">
          <Button onClick={props.onDelete}>
            <DeleteForeverIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
};

DrawEditorToolbar.defaultProps = {
  mode: "view",
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    alignItems: "flex-end",
  },
}));

export default DrawEditorToolbar;

