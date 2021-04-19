import { Dialog, DialogTitle } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { push } from "shared/helpers";

interface SettingsProps {}

const Settings: FC<SettingsProps> = (props) => {
  const router = useRouter();
  const isOpen = router.asPath === "/ajustes";

  return (
    <Dialog open={isOpen} onClose={push(router.pathname)}>
      <DialogTitle>Hey</DialogTitle>
    </Dialog>
  );
};

const useStyles = makeStyles({});

export default Settings;
