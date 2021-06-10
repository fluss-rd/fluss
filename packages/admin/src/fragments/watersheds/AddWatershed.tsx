import { Add } from "@material-ui/icons";
import Fab from "components/Fab";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import React, { FC } from "react";

import WatershedForm from "./WatershedForm";

interface AddWatershedProps {}

const AddWatershed: FC<AddWatershedProps> = (props) => {
  const [isOpen, open, close] = useBoolean();

  return (
    <>
      <Fab onClick={open}>
        <Add />
        Registrar cuenca
      </Fab>
      <FormDialog mode="registrion" isOpen={isOpen} title="Registrar cuenca" onClose={close}>
        <WatershedForm />
      </FormDialog>
    </>
  );
};

export default AddWatershed;
