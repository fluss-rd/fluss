import { Add } from "@material-ui/icons";
import Fab from "components/Fab";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import React, { FC, useRef } from "react";

import WatershedForm, { WatershedFormRef } from "./WatershedForm";

interface AddWatershedProps {}

const AddWatershed: FC<AddWatershedProps> = () => {
  const [isOpen, open, close] = useBoolean();
  const formRef = useRef<WatershedFormRef>();

  const onSubmit = (data: WatershedFormRef) => {
    console.log({ data });
  };

  const onSave = () => {
    formRef.current.form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <Fab onClick={open}>
        <Add />
        Registrar cuenca
      </Fab>
      <FormDialog
        mode="registration"
        isOpen={isOpen}
        title="Registrar cuenca"
        onClose={close}
        onSave={onSave}
      >
        <WatershedForm ref={formRef} />
      </FormDialog>
    </>
  );
};

export default AddWatershed;

