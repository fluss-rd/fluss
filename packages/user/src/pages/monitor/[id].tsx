import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import Last24Hours from "fragments/monitor/id/Last24Hours";
import ModuleLocation from "fragments/monitor/id/ModuleLocation";
import ParameterAnnualSummary from "fragments/monitor/id/ParameterAnnualSummary";
import PreviewToolbar from "fragments/monitor/id/PreviewToolbar";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useGetModule } from "shared/services/monitor/hooks";

interface ModuleDataProps {}

const ModuleData: FC<ModuleDataProps> = () => {
  const classes = useStyles();
  const router = useRouter();

  const moduleId = router.query?.id as string;
  const moduleQuery = useGetModule(moduleId);
  const module = moduleQuery.data;

  return (
    <div className={classes.root}>
      <PreviewToolbar />
      <br />
      <Container maxWidth="lg">
        <Typography variant="h4">{module?.alias}</Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Last24Hours moduleId={moduleId} />
              </Grid>
              <Grid item xs={12} md={5}>
                <ModuleLocation location={module?.location} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <ParameterAnnualSummary moduleId={moduleId} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default ModuleData;
