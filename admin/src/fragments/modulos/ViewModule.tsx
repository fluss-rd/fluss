import {
  AppBar,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { useGetModule } from "hooks/modules-service";
import Module from "models/Module";
import { FC, useEffect } from "react";
import FormField from "shared/components/FormField";
import Transition from "shared/components/Transition";
import { formatDate } from "shared/helpers";

import ModuleForm from "./ModuleForm";
import useModuleForm from "./useModuleForm";

interface ViewModuleProps {
  open?: boolean;
  close?: () => void;
  moduleId: string;
}

const ViewModule: FC<ViewModuleProps> = (props) => {
  const classes = useStyles();
  const formLogic = useModuleForm();
  const moduleQuery = useGetModule(props.moduleId, {
    enabled: false,
    onSuccess: (response) => {
      // Initialize module form initial data.
      if (response?.data) {
        const defaultValues = Module.toModuleForm(response.data);
        formLogic.form.reset(defaultValues);
      }
    },
  });
  const module: Module = moduleQuery.data?.data || ({} as Module);
  const onSubmit = (data: any) => console.log(data);

  // Refetch module data on dialog opening.
  useEffect(() => {
    if (props.open) {
      moduleQuery.refetch();
      formLogic.riversQuery.refetch();
    }
  }, [props.open]);

  return (
    <Dialog fullScreen open={props.open} onClose={props.close} TransitionComponent={Transition}>
      <form noValidate autoComplete="off" onSubmit={formLogic.form.handleSubmit(onSubmit)}>
        <AppBar color="inherit" elevation={0} style={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.close} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Información de módulo
            </Typography>
            <Button color="inherit" type="submit">
              Guardar cambios
            </Button>
          </Toolbar>
          <Divider />
        </AppBar>
        <div className={classes.content}>
          <Grid container spacing={3}>
            {/* Dates */}
            <Grid item xs={12} className={classes.dates}>
              <FormField
                disabled
                underlined
                fullWidth={false}
                variant="standard"
                value={formatDate(module.createdAt, { type: "dateAndTime" })}
                label="Fecha de registro"
              />
              <FormField
                disabled
                underlined
                fullWidth={false}
                variant="standard"
                value={formatDate(new Date(module.updatedAt), { type: "dateAndTime" })}
                label="Última actualización"
              />
            </Grid>
            <ModuleForm moduleForm={formLogic} module={module} />
          </Grid>
        </div>
      </form>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    padding: theme.spacing(3),
    width: "100%",
  },
  dates: {
    display: "flex",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      "& > *:not(:last-child)": {
        marginRight: 0,
        marginBottom: theme.spacing(2),
      },
    },
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default ViewModule;
