import { makeStyles } from "@material-ui/core/styles";
import FormDialog from "components/FormDialog";
import { mockModules, toModuleForm } from "models/module";
import React, { FC, useEffect } from "react";
import { ModuleForm as ModuleFormModel } from "services/modules/models";

import ModuleForm, { useModuleForm } from "./ModuleForm";

interface EditModuleProps {
  moduleId: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditModule: FC<EditModuleProps> = (props) => {
  const classes = useStyles();
  const module = mockModules().find((m) => m.id === props.moduleId);
  const form = useModuleForm(toModuleForm(module));

  useEffect(resetForm, [props.isOpen]);

  function resetForm() {
    if (props.isOpen) {
      form.reset({ ...module });
    }
  }

  const onSubmit = (data: ModuleFormModel) => {
    console.log({ data });
  };

  const onSave = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <FormDialog
      mode="registration"
      isOpen={props.isOpen}
      title="Editar módulo"
      onClose={props.onClose}
      onSave={onSave}
    >
      <ModuleForm form={form} />
    </FormDialog>
  );
};

const useStyles = makeStyles({});

export default EditModule;
