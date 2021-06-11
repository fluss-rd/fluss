import { Add } from "@material-ui/icons";
import Fab from "components/Fab";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import React, { FC } from "react";
import { WatershedForm as WatershedFormModel } from "services/watersheds/models";

import WatershedForm, { useWatershedForm } from "./WatershedForm";

interface AddWatershedProps {}

const AddWatershed: FC<AddWatershedProps> = () => {
  const [isOpen, open, close] = useBoolean();
  const form = useWatershedForm();

  const onSubmit = (data: WatershedFormModel) => {
    console.log({ data });
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
        onSave={form.handleSubmit(onSubmit)}
      >
        <WatershedForm form={form} />
      </FormDialog>
    </>
  );
};

export default AddWatershed;
