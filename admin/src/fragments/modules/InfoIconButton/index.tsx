import { IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { FC } from "react";

interface InfoIconButtonProps {
  moduleId: string;
  onModuleInfo: (moduleId: string) => void;
}

const InfoIconButton: FC<InfoIconButtonProps> = ({ moduleId, onModuleInfo }) => {
  const onClick = () => onModuleInfo(moduleId);

  return (
    <IconButton onClick={onClick}>
      <InfoIcon color="action" style={{ cursor: "pointer" }} />
    </IconButton>
  );
};

export default InfoIconButton;
