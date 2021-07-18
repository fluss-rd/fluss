import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";

import ModuleForm, { useModuleForm } from "../ModuleForm";

interface GeneralProps {}

const General: FC<GeneralProps> = (props) => {
  const classes = useStyles();
  const moduleForm = useModuleForm();

  return (
    <div>
      <ModuleForm form={moduleForm} largeWidth={true} className={classes.root} />
      <br />
      <Button color="primary" variant="contained">
        Guardar cambios
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default General;
