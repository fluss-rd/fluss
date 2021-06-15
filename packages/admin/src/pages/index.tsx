import { Grid } from "@material-ui/core";
import UserCard from "fragments/home/UserCard";
import ResumeByWatershed from "fragments/home/ResumeByWatershed";

export default function Home() {
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <UserCard />
          <br />
          <ResumeByWatershed />
        </Grid>

        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
}

