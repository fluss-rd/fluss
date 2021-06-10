import { Add } from "@material-ui/icons";
import Fab from "components/Fab";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import React, { FC, useRef } from "react";

import WatershedForm, { WatershedFormRef } from "./WatershedForm";

interface AddWatershedProps {}

const AddWatershed: FC<AddWatershedProps> = (props) => {
  const [isOpen, open, close] = useBoolean();
  const formRef = useRef<WatershedFormRef>();

  return (
    <>
      <Fab onClick={open}>
        <Add />
        Registrar cuenca
      </Fab>
      <FormDialog mode="registrion" isOpen={isOpen} title="Registrar cuenca" onClose={close}>
        <WatershedForm ref={formRef} />
      </FormDialog>
    </>
  );
};

export default AddWatershed;

