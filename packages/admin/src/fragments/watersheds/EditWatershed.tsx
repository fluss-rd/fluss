import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import React, { FC } from "react";

import WatershedForm from "./WatershedForm";

interface EditWatershedProps {
  watershedId: string;
  text: string;
}

const EditWatershed: FC<EditWatershedProps> = ({ watershedId, text }) => {
  const [isOpen, open, close] = useBoolean();

  const onClick = () => {
    open();
    console.log({ watershedId });
  };

  return (
    <>
      <Button size="small" color="primary" onClick={onClick}>
        {text}
      </Button>
      <FormDialog mode="registrion" isOpen={isOpen} title="Registrar cuenca" onClose={close}>
        <WatershedForm />
      </FormDialog>
    </>
  );
};

export default EditWatershed;
