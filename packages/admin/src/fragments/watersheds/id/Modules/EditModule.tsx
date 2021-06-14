import { makeStyles } from "@material-ui/core/styles";
import FormDialog from "components/FormDialog";
import { mockModules, toModuleForm } from "models/module";
import React, { FC, useEffect } from "react";

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

  return (
    <FormDialog
      mode="registration"
      isOpen={props.isOpen}
      title="Registrar cuenca"
      onClose={props.onClose}
    >
      <ModuleForm form={form} />
    </FormDialog>
  );
};

const useStyles = makeStyles({});

export default EditModule;
