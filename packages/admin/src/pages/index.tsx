import { Grid } from "@material-ui/core";
import ModulesMap from "fragments/home/ModulesMap";
import ModuleStatuses from "fragments/home/ModuleStatuses";
import ResumeByWatershed from "fragments/home/ResumeByWatershed";
import UserCard from "fragments/home/UserCard";

export default function Home() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <UserCard />
          <br />
          <ResumeByWatershed />
          <br />
          <ModuleStatuses />
        </Grid>

        <Grid item xs={6}>
          <ModulesMap />
        </Grid>
      </Grid>
    </div>
  );
}
