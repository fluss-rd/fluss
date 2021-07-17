import { Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import React, { FC } from "react";

interface BackProps {
  children?: string | JSX.Element | number;
  onClick?: () => void;
}

const Back: FC<BackProps> = ({ children, onClick }) => {
  return (
    <Button startIcon={<ArrowBackIcon />} onClick={onClick} color="inherit">
      {children}
    </Button>
  );
};

Back.defaultProps = {
  children: "Volver",
};

export default Back;

