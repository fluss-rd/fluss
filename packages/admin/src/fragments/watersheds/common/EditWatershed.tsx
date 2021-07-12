import FormDialog from "components/FormDialog";
import React, { FC, useRef } from "react";
import { WatershedForm as WatershedFormModel } from "services/watersheds/models";
import Watershed, { mockWatersheds } from "shared/models/Watershed";

import WatershedForm, { useWatershedForm } from "./WatershedForm";

interface EditWatershedProps {
  isOpen?: boolean;
  close?: () => void;
  watershedId: string;
}

const EditWatershed: FC<EditWatershedProps> = ({ watershedId, isOpen, close }) => {
  const watersheds = mockWatersheds();
  const watershed = watersheds.find((w) => w.id === watershedId) as WatershedFormModel;
  const form = useWatershedForm(watershed);

  return (
    <>
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

EditWatershed.defaultProps = {};

export default EditWatershed;

