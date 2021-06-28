import { Button } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import Watershed, { mockWatersheds } from "models/watershed";
import React, { FC, useRef } from "react";
import { WatershedForm as WatershedFormModel } from "services/watersheds/models";

import WatershedForm, { useWatershedForm } from "./WatershedForm";

interface EditWatershedProps {
  watershedId: string;
  text: string;
  useIcon?: boolean;
}

const EditWatershed: FC<EditWatershedProps> = ({ watershedId, text, useIcon }) => {
  const [isOpen, open, close] = useBoolean();
  const watersheds = mockWatersheds();
  const watershed = watersheds.find((w) => w.id === watershedId) as WatershedFormModel;
  const form = useWatershedForm(watershed);

  const onClick = () => {
    open();
    console.log({ watershedId });
  };

  return (
    <>
      <Button size="small" color="primary" onClick={onClick} startIcon={useIcon && <Edit />}>
        {text}
      </Button>
      <FormDialog
        mode="registration"
        isOpen={isOpen}
        title="Registrar cuenca"
        onClose={close}
        ModalContentProps={{ style: { overflow: "hidden" } }}
      >
        <WatershedForm form={form} />
      </FormDialog>
    </>
  );
};

EditWatershed.defaultProps = {
  useIcon: false,
};

export default EditWatershed;

