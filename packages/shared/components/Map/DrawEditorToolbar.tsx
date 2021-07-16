import { Button, ButtonGroup, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CropFreeIcon from "@material-ui/icons/CropFree";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React, { FC } from "react";

interface DrawEditorToolbarProps {
  onDrawMode: () => void;
  onDelete: () => void;
}

const DrawEditorToolbar: FC<DrawEditorToolbarProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical outlined primary button group"
        className={classes.button}
      >
        <Tooltip title="Habilitar selección">
          <Button onClick={props.onDrawMode}>
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
