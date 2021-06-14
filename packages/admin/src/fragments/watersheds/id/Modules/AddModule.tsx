import Fab from "components/Fab";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import FormDialog from "components/FormDialog";
import useBoolean from "hooks/useBoolean";
import ModuleForm from "./ModuleForm";

interface AddModuleProps {}

const AddModule: FC<AddModuleProps> = (props) => {
  const classes = useStyles();
  const [isOpen, open, close] = useBoolean();

  return (
    <>
      <Fab onClick={open}>
        <Add />
        Registrar módulo
      </Fab>
      <FormDialog mode="registration" isOpen={isOpen} title="Registrar cuenca" onClose={close}>
        <ModuleForm />
      </FormDialog>
    </>
  );
};

const useStyles = makeStyles({});

export default AddModule;

