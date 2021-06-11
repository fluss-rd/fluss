import { Button } from "@material-ui/core";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import React, { FC, useRef } from "react";

import WatershedForm, { useWatershedForm } from "./WatershedForm";
import Watershed, { mockWatersheds } from "models/watershed";
import { WatershedForm as WatershedFormModel } from "services/watersheds/models";

interface EditWatershedProps {
  watershedId: string;
  text: string;
}

const EditWatershed: FC<EditWatershedProps> = ({ watershedId, text }) => {
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
      <Button size="small" color="primary" onClick={onClick}>
        {text}
      </Button>
      <FormDialog mode="registration" isOpen={isOpen} title="Registrar cuenca" onClose={close}>
        <WatershedForm form={form} />
      </FormDialog>
    </>
  );
};

export default EditWatershed;

