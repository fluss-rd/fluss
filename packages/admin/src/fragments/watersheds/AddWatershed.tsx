import { Add } from "@material-ui/icons";
import Fab from "components/Fab";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import React, { FC } from "react";
import { WatershedForm as WatershedFormModel } from "services/watersheds/models";
import { useRegisterWatershed } from "services/watersheds/hooks";
import { useTheme } from "@material-ui/core/styles";

import WatershedForm, { useWatershedForm } from "./WatershedForm";

interface AddWatershedProps {
  detailIsOpen?: boolean;
  marginRight?: number;
}

const AddWatershed: FC<AddWatershedProps> = (props) => {
  const theme = useTheme();
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

  const rightSpacing = theme.spacing(4);

  return (
    <>
      <Fab
        onClick={open}
        position="fixed"
        variant="round"
        style={{ right: props.detailIsOpen ? props.marginRight + rightSpacing : rightSpacing }}
      >
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

