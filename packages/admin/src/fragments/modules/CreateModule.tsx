import { Add } from "@material-ui/icons";
import Fab from "components/Fab";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import React, { FC } from "react";
import { ModuleForm as ModuleFormModel } from "services/modules/models";
import { useRegisterModule } from "services/modules/hooks";

import ModuleForm, { useModuleForm, defaultValues } from "./ModuleForm";

interface CreateModuleProps {}

const CreateModule: FC<CreateModuleProps> = (props) => {
  const moduleForm = useModuleForm();
  const createModuleQuery = useRegisterModule();
  const [isOpen, open, close] = useBoolean();

  const resetForm = () => {
    moduleForm.reset({ ...defaultValues });
  };

  const onSubmit = (data: ModuleFormModel) => {
    console.log({ data });
    createModuleQuery.mutate(data);
    resetForm();
    close();
  };

  const onCancel = () => {
    resetForm();
    close();
  };

  return (
    <>
      <Fab onClick={open}>
        <Add />
        Registrar módulo
      </Fab>
      {/* TODO: implement on save actions. */}
      <FormDialog
        mode="registration"
        isOpen={isOpen}
        title="Registrar módulo"
        onClose={onCancel}
        onSave={moduleForm.handleSubmit(onSubmit)}
      >
        <ModuleForm form={moduleForm} />
      </FormDialog>
    </>
  );
};

export default CreateModule;

