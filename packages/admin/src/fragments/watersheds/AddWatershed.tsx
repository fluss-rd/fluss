import { Add } from "@material-ui/icons";
import Fab from "components/Fab";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import React, { FC } from "react";
import { WatershedForm as WatershedFormModel } from "services/watersheds/models";
import { useRegisterWatershed } from "services/watersheds/hooks";

import WatershedForm, { useWatershedForm } from "./WatershedForm";

interface AddWatershedProps {}

const AddWatershed: FC<AddWatershedProps> = () => {
  const [isOpen, open, close] = useBoolean();
  const watershedMutation = useRegisterWatershed();
  const form = useWatershedForm();

  const resetForm = () => {
    form.reset({
      name: "",
      type: "",
      location: [],
    });
  };

  const onSubmit = (data: WatershedFormModel) => {
    watershedMutation.mutate(data);
    resetForm();
    close();
  };

  const onCancel = () => {
    close();
    resetForm();
  };

  return (
    <>
      <Fab onClick={open} position="absolute" variant="round">
        <Add />
      </Fab>
      <FormDialog
        mode="registration"
        isOpen={isOpen}
        title="Registrar cuerpo hídrico"
        onClose={onCancel}
        onSave={form.handleSubmit(onSubmit)}
      >
        <WatershedForm form={form} />
      </FormDialog>
    </>
  );
};

export default AddWatershed;

