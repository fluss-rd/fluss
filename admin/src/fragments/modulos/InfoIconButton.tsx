import { IconButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import { FC } from "react";

interface InfoIconButtonProps {
  index: string;
  handleClick: (index: string) => void;
}

const InfoIconButton: FC<InfoIconButtonProps> = (props) => {
  const classes = useStyles();

  function onClick() {
    props.handleClick(props.index);
  }

  return (
    <IconButton onClick={onClick}>
      <InfoIcon color="action" className={classes.infoIcon} />
    </IconButton>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  infoIcon: {
    cursor: "pointer",
  },
}));

export default InfoIconButton;
