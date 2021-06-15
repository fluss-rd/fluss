import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import Fab from "components/Fab";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import React, { FC } from "react";
import { ModuleForm as ModuleFormModel } from "services/modules/models";

import ModuleForm, { useModuleForm } from "./ModuleForm";

interface AddModuleProps {
  watershedId: string;
}

const AddModule: FC<AddModuleProps> = (props) => {
  const classes = useStyles();
  const form = useModuleForm({ watershedId: props.watershedId, status: "active" });
  const [isOpen, open, close] = useBoolean();

  const onSubmit = (data: ModuleFormModel) => {
    console.log({ data });
  };

  const onSave = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <Fab onClick={open}>
        <Add />
        Registrar módulo
      </Fab>
      <FormDialog
        mode="registration"
        isOpen={isOpen}
        title="Registrar módulo"
        onClose={close}
        onSave={onSave}
      >
        <ModuleForm form={form} />
      </FormDialog>
    </>
  );
};

const useStyles = makeStyles({});

export default AddModule;
