import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { fromModuleResponsetoModuleForm } from "services/modules/models";
import { useGetModuleInfoById } from "shared/services/modules/hooks";

import ModuleForm, { useModuleForm } from "../ModuleForm";

interface GeneralProps {}

const General: FC<GeneralProps> = () => {
  const classes = useStyles();
  const router = useRouter();
  const moduleId = router.query.id as string;
  const infoQuery = useGetModuleInfoById(moduleId);

  const infoData = fromModuleResponsetoModuleForm(infoQuery?.data?.data);
  const moduleForm = useModuleForm(infoData, [infoQuery.data?.data]);

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
