import { Dialog, IconButton, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { makeStyles } from "@material-ui/core/styles";
import { Info } from "@material-ui/icons";
import React, { FC, useState } from "react";

interface IconButtonModalProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const IconButtonModal: FC<IconButtonModalProps> = ({ Icon, children }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <IconButton onClick={openDialog}>{Icon ? <Icon /> : <Info />}</IconButton>
      <Dialog
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        {children}
      </Dialog>
    </>
  );
};

const useStyles = makeStyles({});

export default IconButtonModal;
