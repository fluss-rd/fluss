import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import Fab from "components/Fab";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import React, { FC } from "react";

import ModuleForm, { useModuleForm } from "./ModuleForm";

interface CreateModuleProps {}

const CreateModule: FC<CreateModuleProps> = (props) => {
  const classes = useStyles();
  const moduleForm = useModuleForm();
  const [isOpen, open, close] = useBoolean();

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
        onSave={() => console.log("hey")}
      >
        <ModuleForm form={moduleForm} />
      </FormDialog>
    </>
  );
};

const useStyles = makeStyles({});

export default CreateModule;
