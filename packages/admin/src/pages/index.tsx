import { Grid } from "@material-ui/core";
import UserCard from "fragments/home/UserCard";
import ResumeByWatershed from "fragments/home/ResumeByWatershed";
import ModuleStatuses from "fragments/home/ModuleStatuses";

export default function Home() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <UserCard />
          <br />
          <ResumeByWatershed />
        </Grid>

        <Grid item xs={6}>
          <ModuleStatuses />
        </Grid>
      </Grid>
    </div>
  );
}

