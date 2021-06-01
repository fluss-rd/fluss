import { Grid, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import React, { FC } from "react";

interface InProgressProps {
  name: string;
}

const InProgress: FC<InProgressProps> = ({ name }) => {
  const { center, container } = useStyles();

  return (
    <div className={container}>
      <Grid container>
        <Grid item xs={12} className={center}>
          <HomeWorkIcon fontSize="large" color="action" />
        </Grid>
        <Grid item xs={12} className={center}>
          <Typography variant="h5" color="textSecondary">
            La página <strong>{name}</strong> se encuentra en proceso de construcción
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:first-of-type": {
      marginBottom: theme.spacing(2),
    },
    "&:last-of-type > *:first-child": {
      maxWidth: 300,
      textAlign: "center",
    },
  },
}));

export default InProgress;
