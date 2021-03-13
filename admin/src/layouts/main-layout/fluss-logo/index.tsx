import { Button, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Image from "next/image";

import { push } from "../../../helpers";

export default function FlussLogo() {
  const classes = useStyles();

  return (
    <Button className={classes.brand} onClick={push("/")}>
      <div className={classes.logo}>
        <Image src="/images/logo.png" alt="Logo" width={35} height={35} />
      </div>
      <Typography className={classes.title} variant="h6" noWrap>
        fluss
      </Typography>
    </Button>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  brand: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginRight: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: "fit-content",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.primary.main,
    cursor: "pointer",
    textTransform: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));
