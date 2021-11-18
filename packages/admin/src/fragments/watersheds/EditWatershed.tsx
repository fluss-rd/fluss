import FormDialog from "components/FormDialog";
import React, { FC } from "react";
import { watershedToWatershedForm } from "services/watersheds/models";
import { useGetWatershedById } from "shared/services/watersheds/hooks";

import WatershedForm, { useWatershedForm } from "./WatershedForm";

interface EditWatershedProps {
  isOpen?: boolean;
  close?: () => void;
  watershedId: string;
}

const EditWatershed: FC<EditWatershedProps> = ({ watershedId, isOpen, close }) => {
  const watershedQuery = useGetWatershedById(watershedId);
  const watershedForm = watershedToWatershedForm(watershedQuery.data);
  const form = useWatershedForm(watershedForm, [watershedQuery.data]);

  return (
    <FormDialog mode="edition" isOpen={isOpen} title="Editar cuerpo hídrico" onClose={close}>
      <WatershedForm form={form} />
    </FormDialog>
  );
};

EditWatershed.defaultProps = {};

export default EditWatershed;
