import { Button, Divider, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Image from "next/image";
import React, { FC } from "react";

import { push } from "../../../helpers";

interface FlussLogoProps {}

const FlussLogo: FC<FlussLogoProps> = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div>
          <Button className={classes.brand} onClick={push("/")}>
            <div className={classes.logo}>
              <Image src="/images/logo.png" alt="Logo" width={20} height={20} />
            </div>
            <Typography className={classes.title} noWrap>
              fluss
            </Typography>
          </Button>
        </div>
      </div>
      <Divider />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    display: "flex",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginRight: theme.spacing(3),
    padding: 0,
    flexGrow: 1,
    textAlign: "left",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    display: "none",
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.primary.main,
    cursor: "pointer",
    textTransform: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default FlussLogo;
