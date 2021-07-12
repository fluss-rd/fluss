import { AppBar, Button, Hidden, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { useRouter } from "next/router";
import React, { FC } from "react";
import ModuleDataDownload from "shared/components/ModuleDataDownload";
import useBoolean from "shared/hooks/useBoolean";

interface PreviewToolbarProps {}

const PreviewToolbar: FC<PreviewToolbarProps> = (props) => {
  const [isOpen, open, close] = useBoolean();
  const classes = useStyles();
  const router = useRouter();

  const toMonitor = () => {
    router.push("/monitor");
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0} variant="outlined">
        <Toolbar>
          <div className={classes.title}>
            <Button startIcon={<KeyboardArrowLeftIcon />} onClick={toMonitor}>
              Volver al mapa
            </Button>
          </div>
          <div className={classes.search}>
            <Hidden smUp>
              <IconButton color="primary" onClick={open}>
                <GetAppIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <Button color="primary" startIcon={<GetAppIcon />} onClick={open}>
                <span className={classes.downloadText}>Descargar datos</span>
              </Button>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>

      <ModuleDataDownload close={close} isOpen={isOpen} moduleId="hey" />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: "block",
  },
  search: {},
  downloadText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default PreviewToolbar;
