import { Button, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Image from "next/image";
import { useContext } from "react";

import { push } from "../helpers";
import { MainLayoutContext, MainLayoutValues } from "../layouts/MainLayout/index";

export default function FlussLogo() {
  const context = useContext(MainLayoutContext);
  const classes = useStyles(context);

  return (
    <Button className={classes.brand} onClick={push("/")}>
      <div className={classes.logo}>
        <Image src="/images/logo.png" alt="Logo" width={35} height={35} />
      </div>
      <Typography variant="h5" color="primary" noWrap>
        fluss
      </Typography>
    </Button>
  );
}

const useStyles = makeStyles<Theme, MainLayoutValues>((theme: Theme) => ({
  brand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "pointer",
    textTransform: "none",
    padding: 0,
    flexGrow: 1,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
}));
